import os
import shutil
import urllib.request

import numpy as np
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import cv2 as cv
from PIL import Image
import extcolors

from sklearn.cluster import KMeans

URL = r"/Users/gungo/workspace/connect-project/backend/tctapp/img/"


def crawling(keyword, count):
    # 크롤링 20개 기준 56초
    start = time.time()
    print(f"키워드({keyword}) {count}개 이미지 크롤링 시작!")
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
    os.makedirs(URL + keyword, exist_ok=True)

    for i in range(count):
        try:
            images[i].click()  # 이미지 클릭
            time.sleep(1)
            img_url = driver.find_element(By.CSS_SELECTOR, ".n3VNCb").get_attribute(
                "src"
            )
            save_path = URL + keyword + "/" + str(i) + ".png"
            # os.system("curl -k " + img_url + f" > {save_path}")
            with urllib.request.urlopen(img_url) as f:
                with open(save_path, 'wb') as h:
                    img = f.read()
                    h.write(img)
            if os.path.exists(save_path):
                print(f"키워드({keyword}) - {i}.png 이미지 크롤링 성공!")
            else:
                print("!!!!!!!!!")
                print(f"키워드({keyword}) - {i}.png 이미지 크롤링 실패!")
                print("!!!!!!!!!")

        except:
            pass

    driver.close()
    end = time.time()
    print(f"{count}개 이미지 크롤링할 때 걸린 시간: {end - start:.2f} sec")


# folder path -> 폴더 안에 있는 이미지를 리스트화
def get_file_count(folder_path):
    return os.listdir(folder_path)


def palette(clusters):
    width = 300
    palette = np.zeros((50, width, 3), np.uint8)
    steps = width / clusters.cluster_centers_.shape[0]
    for idx, centers in enumerate(clusters.cluster_centers_):
        palette[:, int(idx * steps) : (int((idx + 1) * steps)), :] = centers
    return palette


# 이미지에서 주요 색상 추출
def color(n_of_colors, keyword):
    clt = KMeans(n_clusters=n_of_colors)

    path = URL + keyword + "/"  # 크롤링 이미지 저장된 경로
    save_path = URL + "output/"
    os.makedirs(save_path, exist_ok=True)  # 주요 색상 추출한 이미지 폴더 생성

    ct = []
    for i in get_file_count(path):
        img = cv.imread(path + i)
        img = cv.cvtColor(img, cv.COLOR_BGR2RGB)
        clt_1 = clt.fit(img.reshape(-1, 3))
        img = palette(clt_1)
        ct.append(img)

    img2 = cv.vconcat(ct)
    clt_1 = clt.fit(img2.reshape(-1, 3))

    # 색상이 한 개라면
    if n_of_colors == 1:
        cv.imwrite(save_path + str(n_of_colors) + "_output.jpg", palette(clt_1))
    # 색상이 여러 개라면
    else:
        cv.imwrite(save_path + str(n_of_colors) + "_output.jpg", palette(clt_1))


# FIXME 추출한 색상이 여러 개라도 색상이 비슷하면 RGB 값은 하나 밖에 안 나옴
def color_rgb(n_of_colors):
    img = Image.open(URL + "output/" + str(n_of_colors) + "_output.jpg")
    colors, pixel_count = extcolors.extract_from_image(img)

    # 주요 색상이 한 개라면
    if n_of_colors == 1:
        for c in colors:
            code = c[0]
        return code
    # 주요 색상이 여러 개라면
    else:
        code = []
        for c in colors:
            rgb = f"{c[0]}"
            code.append(rgb)
        return code


def folder_delete(keyword):
    crawling_folder_path = URL + keyword
    output_folder_path = URL + "output"

    # 크롤링한 이미지 폴더 삭제
    if os.path.exists(crawling_folder_path):
        shutil.rmtree(crawling_folder_path)

    # 주요 색상 추출한 이미지 폴더 삭제
    if os.path.exists(output_folder_path):
        shutil.rmtree(output_folder_path)

    print("키워드(" + keyword + ")의 주요 색상 RGB 값을 뽑아내기 위해서 만든 이미지 폴더를 삭제했어요!")
