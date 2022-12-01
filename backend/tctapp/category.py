'''
!pip install mxnet
!pip install gluonnlp pandas tqdm
!pip install sentencepiece
!pip install transformers==3.0.2
!pip install torch

!pip install git+https://git@github.com/SKTBrain/KoBERT.git@master
'''

# torch
import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook

#kobert
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model

# #BERT 모델, Vocabulary 불러오기 필수
bertmodel, vocab = get_pytorch_kobert_model()

# KoBERT에 입력될 데이터셋 정리
class BERTDataset(Dataset):
    def __init__(self, dataset, sent_idx, label_idx, bert_tokenizer, max_len,
                 pad, pair):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair)

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return (self.sentences[i] + (self.labels[i], ))

    def __len__(self):
        return (len(self.labels))

# 모델 정의
class BERTClassifier(nn.Module): ## 클래스를 상속
    def __init__(self,
                 bert,
                 hidden_size = 768,
                 num_classes=37,   ##클래스 수 조정##
                 dr_rate=None,
                 params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size , num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(input_ids = token_ids, token_type_ids = segment_ids.long(), attention_mask = attention_mask.float().to(token_ids.device))
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)

# Setting parameters
max_len = 64
batch_size = 64
warmup_ratio = 0.1
num_epochs = 20
max_grad_norm = 1
log_interval = 200
learning_rate =  5e-5

# 학습 모델 로드
PATH = r"/Users/gungo/workspace/connect-project/backend/tctapp/"
model = torch.load(PATH+"koBERTmodel_ver4.pt", torch.device('mps'))
model.load_state_dict(torch.load(PATH+"koBERTmodelStateDict_ver4.pt", torch.device('mps')))

print(model)
# 토큰화
tokenizer = get_tokenizer()
tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

def new_softmax(a) :
    c = np.max(a) # 최댓값
    exp_a = np.exp(a-c) # 각각의 원소에 최댓값을 뺀 값에 exp를 취한다. (이를 통해 overflow 방지)
    sum_exp_a = np.sum(exp_a)
    y = (exp_a / sum_exp_a) * 100
    return np.round(y, 3)

# 예측 모델 설정
def predict(predict_sentence):

    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
    model.eval()

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length= valid_length
        label = label.long()

        out = model(token_ids, valid_length, segment_ids)

        test_eval=[]
        for i in out:
            logits=i
            logits = logits.detach().cpu().numpy()
            min_v = min(logits)
            total = 0
            probability = []
            logits = np.round(new_softmax(logits), 3).tolist()
            for logit in logits:
                #print(logit)
                probability.append(np.round(logit, 3))

            if np.argmax(logits) == 0:  result = '신문, 언론, 저널리즘'
            elif np.argmax(logits) == 1: result = '문헌정보학'
            elif np.argmax(logits) == 2: result = '일반연속간행물'
            elif np.argmax(logits) == 3: result = '일반학회, 단체, 협회, 기관'
            elif np.argmax(logits) == 4: result = '총류'
            elif np.argmax(logits) == 5: result = '철학'
            elif np.argmax(logits) == 6: result = '형이상학'
            elif np.argmax(logits) == 7: result = '심리학'
            elif np.argmax(logits) == 8: result = '윤리학'
            elif np.argmax(logits) == 9: result = '사회과학'
            elif np.argmax(logits) == 10: result = '통계학'
            elif np.argmax(logits) == 11: result = '경제학'
            elif np.argmax(logits) == 12: result = '사회학, 사회문제'
            elif np.argmax(logits) == 13: result = '정치학'
            elif np.argmax(logits) == 14: result = '행정학'
            elif np.argmax(logits) == 15: result = '법학'
            elif np.argmax(logits) == 16: result = '교육학'
            elif np.argmax(logits) == 17: result = '풍속, 민속학'
            elif np.argmax(logits) == 18: result = '국방, 군사학'
            elif np.argmax(logits) == 19: result = '지학'
            elif np.argmax(logits) == 20: result = '광물학'
            elif np.argmax(logits) == 21: result = '물리학'
            elif np.argmax(logits) == 22: result = '공학, 공업일반'
            elif np.argmax(logits) == 23: result = '예술'
            elif np.argmax(logits) == 24: result = '문화'
            elif np.argmax(logits) == 25: result = '건축술'
            elif np.argmax(logits) == 26: result = '회화,도화'
            elif np.argmax(logits) == 27: result = '오락, 운동'
            elif np.argmax(logits) == 28: result = '연극'
            elif np.argmax(logits) == 29: result = '음악'
            elif np.argmax(logits) == 30: result = '독일어'
            elif np.argmax(logits) == 31: result = '한국어'
            elif np.argmax(logits) == 32: result = '문학'
            elif np.argmax(logits) == 33: result = '한국문학'
            elif np.argmax(logits) == 34: result = '영미문학'
            elif np.argmax(logits) == 35: result = '역사'
            elif np.argmax(logits) == 36: result = '아시아'

            probability.append(result)
            print('3')
            #print(probability)
    return probability, result


def category_sim(category):
    if category == '신문, 언론, 저널리즘': prob_index = 0
    elif category == '문헌정보학': prob_index = 1
    elif category == '일반연속간행물': prob_index = 2
    elif category == '일반학회, 단체, 협회, 기관': prob_index = 3
    elif category == '총류': prob_index = 4
    elif category == '철학': prob_index = 5
    elif category == '형이상학': prob_index = 6
    elif category == '심리학': prob_index = 7
    elif category == '윤리학': prob_index = 8
    elif category == '사회과학': prob_index = 9
    elif category == '통계학': prob_index = 10
    elif category == '경제학': prob_index = 11
    elif category == '사회학, 사회문제': prob_index = 12
    elif category == '정치학': prob_index = 13
    elif category == '행정학': prob_index = 14
    elif category == '법학': prob_index = 15
    elif category == '교육학': prob_index = 16
    elif category == '풍속, 민속학': prob_index = 17
    elif category == '국방, 군사학': prob_index = 18
    elif category == '지학': prob_index = 19
    elif category == '광물학': prob_index = 20
    elif category == '물리학': prob_index = 21
    elif category == '공학, 공업일반': prob_index = 22
    elif category == '예술': prob_index = 23
    elif category == '문화': prob_index = 24
    elif category == '건축술': prob_index = 25
    elif category == '회화,도화': prob_index = 26
    elif category == '오락, 운동': prob_index = 27
    elif category == '연극': prob_index = 28
    elif category == '음악': prob_index = 29
    elif category == '독일어': prob_index = 30
    elif category == '한국어': prob_index = 31
    elif category == '문학': prob_index = 32
    elif category == '한국문학': prob_index = 33
    elif category == '영미문학': prob_index = 34
    elif category == '역사': prob_index = 35
    elif category == '아시아': prob_index = 36
    return prob_index


input = "곰 세마리가 한 집에 있어 아빠곰! 엄마곰! 아기곰 아빠곰은 뚱.뚱.해 엄마곰은 날.씬.해 아기곰은 너무 귀여워 \
            으쓱으쓱 잘한다 으쓱으쓱 잘한다 나는 아빠곰 나는 엄마곰 나는 아기곰 나는 아빠곰 나는 엄마곰 나는 아기곰 \
            곰 세마리가 한 집에 있어 아빠곰! 엄마곰! 아기곰 아빠곰은 뚱.뚱.해 엄마곰은 날.씬.해 아기곰은 너무 귀여워 \
            으쓱으쓱 잘한다 으쓱으쓱 잘한다"
model_prob, model_result = predict(input)
print(model_result)

model_prob_index = category_sim(model_result)
print(model_prob[model_prob_index]) #모델이 예측한 결과에 대한 확률

input_topic = "음악"  #사용자가 입력한 주제
user_prob_index = category_sim(input_topic)
print(model_prob[user_prob_index]) #사용자가 입력한 주제에 대한 확률