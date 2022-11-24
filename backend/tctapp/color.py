import os
import shutil

from colorthief import ColorThief
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import urllib.request


URL = os.path.join(r"/Users/gungo/workspace/connect-project/backend/tctapp/")


# FIXME 한글이면 색상 추출이 안돼서 임시로 keyword_id 인자 넣었음, 종호형한테 코드 받아서 수정하면 빼기!!!!!!!!
def crawling(keyword, keyword_id):
    # 크롤링 30개 기준 40초
    # selenium으로 구글 이미지 접속 후 이미지 검색
    print("키워드(" + keyword + ") 크롤링 시작!")
    options = webdriver.ChromeOptions()
    options.headless = True
    options.add_argument("window-size=1920x1080")

    driver = webdriver.Chrome(options=options)
    driver.get("https://www.google.co.kr/imghp?hl=ko&tab=wi&ogbl")

    elem = driver.find_element("name", "q")

    elem.send_keys(keyword)
    elem.send_keys(Keys.RETURN)

    # 이미지 찾고 다운받기
    images = driver.find_elements(By.CSS_SELECTOR, ".rg_i.Q4LuWd")

    for i in range(1):
        try:
            images[i].click()  # 이미지 클릭
            time.sleep(1)
            os.makedirs(URL + "/img/" + str(keyword_id))
            img_url = driver.find_element(By.CSS_SELECTOR, ".n3VNCb").get_attribute(
                "src"
            )
            urllib.request.urlretrieve(
                img_url,
                URL + "/img/" + str(keyword_id) + "/" + str(i) + ".jpg",
            )  # 이미지 다운

        except:
            pass

    driver.close()


# folder path -> 폴더 안에 있는 이미지를 리스트화
def get_file_count(folder_path):
    return os.listdir(folder_path)


# 현재 이미지 하나에 대해서 가장 많은 비율을 차지하는 색상 하나 뽑아냄
def key_color(keyword, keyword_id):
    img_path = r"/Users/gungo/workspace/connect-project/backend/tctapp/img/" + str(
        keyword_id
    )
    ct = ColorThief(img_path + "/0.jpg")
    color = ct.get_color(quality=1)
    return color


# 현재 이미지 하나에 대해서 가장 많은 비율을 차지하는 색상 3개 뽑아냄
def key_color_many(keyword, keyword_id):
    img_path = r"/Users/gungo/workspace/connect-project/backend/tctapp/img/" + str(
        keyword_id
    )
    color_list = []
    for i in range(2, 5):
        ct = ColorThief(img_path + "/0.jpg")
        color = ct.get_color(quality=i)
        color_list.append(color)
    return color_list


def folder_delete(keyword, keyword_id):
    folder_path = r"/Users/gungo/workspace/connect-project/backend/tctapp/img/" + str(
        keyword_id
    )

    if os.path.exists(folder_path):
        shutil.rmtree(folder_path)

    print("키워드(" + keyword + ")의 주요 색상 RGB 값을 뽑아내기 위해서 만든 이미지 폴더를 삭제했어요!")
