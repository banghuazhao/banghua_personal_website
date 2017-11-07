// Created by Banghua Zhao
// 2017
// banghua.zhao@gmail.com

myPorfPic = document.querySelector(".prof-pic")

myPorfPic.addEventListener("mouseover",function() {
  myPorfPic.setAttribute("src","img/profile2.jpg");
});
myPorfPic.addEventListener("mouseout",function() {
  myPorfPic.setAttribute("src","img/profile.png");
});
