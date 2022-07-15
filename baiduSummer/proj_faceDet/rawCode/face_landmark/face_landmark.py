import cv2
import paddlehub as hub
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import eel
import numpy as np
import math
from PIL import Image
import os

os.makedirs("./input/", exist_ok=True)


def keyPointDetection(imgPath: str):
    from urllib.request import urlretrieve
    urlretrieve(imgPath, './input/srcImg.png')
    src_img = cv2.imread("./input/srcImg.png")
    # print(imgPath)
    # 加载模型并进行预测
    module = hub.Module(name="face_landmark_localization")
    result = module.keypoint_detection(images=[src_img])

    tmp_img = src_img.copy()
    if len(result) != 0:
        for i in range(len(result[0]['data'])):
            for index, point in enumerate(result[0]['data'][i]):
                cv2.circle(tmp_img, (int(point[0]), int(point[1])), 1, (0, 255, 0), -1)

        res_img = 'output/face_landmark.png'
        cv2.imwrite(res_img, tmp_img)

        img = mpimg.imread(res_img)
        # 展示预测68个关键点结果
        plt.figure(figsize=(10, 10))
        plt.imshow(img)
        plt.axis('off')
        plt.show()
        return 'face_landmark/' + res_img
    else:
        return 'ErrorMark'


@eel.expose
def landmark_entry(imgPath: str):
    print("process in landmark")
    return keyPointDetection(imgPath)


if __name__ == "__main__":
    eel.init("../")
    eel.start("index.html")
