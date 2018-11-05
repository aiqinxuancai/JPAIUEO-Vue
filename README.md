
<div align="center">
<br>
<img width="256" src="./docs/images/logo.png" alt="electron-vue">
<br>
<br>
</div>
<p align="center" color="#6a737d">
<h2 align="center">JPAIUEO</h2>
</p>

<p align="center" color="#6a737d">
固定在桌面顶部浮窗，帮助学习和记忆50音的发音 <br>
Hiragana and Katakana desktop learning tools
</p>

## 功能
### 基本使用
主窗口中会随机显示一个音，但是不会提示其读法，如回忆后无法知道读音，这时可点击下方声音按钮，进行朗读，并显示音的写法。如了解读法，则点击平假名或片假名即可随机切换一组音。

### 掌握程度的记录功能
在主窗口切换一个新的音，如果点了听语音则说明未掌握，如直接跳过则认为掌握，最终会以三个等级显示在50音图中，清晰标示你掌握和未掌握的音。  
建议屏蔽一个平假名或片假名进行掌握，否则你可能因为记忆了这个音的平假名或片假名其中之一，而认为另一个形态也是掌握的。

## Soft Image  
<img  src="./docs/images/soft.png" alt="electron-vue">
<img  src="./docs/images/full.png" alt="electron-vue">

## Update
##

## Build Setup

``` bash 
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test
```
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
