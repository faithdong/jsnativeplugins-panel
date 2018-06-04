/*
 * @Author: zhongxd 
 * @Date: 2018-05-29 16:17:44 
 * @Last Modified by: zhongxd
 * @Last Modified time: 2018-05-29 16:30:04
 * 弹框拖动插件
 */

; (function () {
  'use strict'
  var _global;
  //----1、定义插件构造函数-----
  function DragPanel() {
    this.initial();
  };

  //-----2、定义插件方法-----
  /**
   * 初始化插件
   */
  DragPanel.prototype.initial = function () {
    var strHtml = createPicMagnifier();
    document.body.innerHTML = strHtml;
    this.drag();
    this.close();
  };

  /**
   * 创建 插件静态模板字符串 html 
   */
  var createPicMagnifier = function () {
    var strHtml =
      //'<div class="pp-modal-mask"></div><div class="pp-modal-wrap">'
      //'<div class="pp-modal-wrap" >'
      //'<div class="pp-modal" id="ppmodal" style="width: 500px; transform-origin: -30px 431px 0px;">'
      '<div class="pp-modal-content" id="targetEle">'
      + '<button aria-label="Close" class="pp-modal-close" id="closebtn"><span class="pp-modal-close-x">X</span></button>'
      + '<div class="pp-modal-header" id="dragEle"><div class="pp-modal-title" id="rcDialogTitle2">图片预览</div></div>'
      + '<div class="pp-modal-body">'
      + '<div class="pp-scale">'
      + '<div class="pp-card pp-card-bordered" id="normalimgdiv">'
      + '<img alt="example" width="100% " style="vertical-align: middle; height: 350px;" src="./images/img1.jpg" >'
      + '</div>'
      + '<div class="pp-card">'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>'
    // + '</div>'
    // + '</div>'
    // + '</div>';
    return strHtml;

  };


  /**
   * 删除
   */
  DragPanel.prototype.close = function () {
    var closebtn = document.getElementById('closebtn');
    closebtn.onclick = function (e) {
      var drag = document.getElementById('drag');
      drag.remove();
    }
  };


  /**
   * 拖拽
   */
  DragPanel.prototype.drag = function () {
    var targetEle = document.getElementById('targetEle');
    var dragEle = document.getElementById('dragEle');
    var dragCallback = function (left, top) {
      console.log(left);
      console.log(top);
    };
    startDrag(targetEle, dragEle, false, dragCallback());

    
    /*drag.onmousedown = function (e) {
      var e = e || window.event;
      debugger;
      var diffX = e.clientX - drag.offsetLeft;
      var diffY = e.clientY - drag.offsetTop;
      if (typeof drag.setCapture != 'undefined') {
        drag.setCapture();
      }
      drag.onmousemove = function (e) {
        var e = e || window.event; //兼容ie浏览器  
        var left = e.clientX - diffX;
        var top = e.clientY - diffY;

        //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条  
        if (left < 0) {
          left = 0;
        } else if (left > window.innerWidth - drag.offsetWidth) {
          left = window.innerWidth - drag.offsetWidth;
        }
        if (top < 0) {
          top = 0;
        } else if (top > window.innerHeight - drag.offsetHeight) {
          top = window.innerHeight - drag.offsetHeight;
        }
        //移动时重新得到物体的距离，解决拖动时出现晃动的现象  
        drag.style.left = left + 'px';
        drag.style.top = top + 'px';
      };

      drag.onmouseup = function (e) { //当鼠标弹起来的时候不再移动  
        this.onmousemove = null;
        this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
        //修复低版本ie bug  
        if (typeof drag.releaseCapture != 'undefined') {
          drag.releaseCapture();
        }
      };
    }; */
  };

  var startDrag = function (targetEle, dragEle, inWindow, callback) {
    var dragParams = {
      left: 0,
      top: 0,
      currentX: 0,
      currentY: 0
    };

    bindEventFunc(dragEle, "onmousedown", function (e) {
      e.preventDefault();
      var e = e ? e : window.event;
      //1、获取拖拽窗口的偏移量
      dragParams.left = targetEle.offsetLeft;
      dragParams.top = targetEle.offsetTop;
      //2、获取当前鼠标坐标点
      dragParams.currentX = e.clientX;
      dragParams.currentY = e.clientY;
    });

    bindEventFunc(document.body,"onmouseup",function(e){
      e.preventDefault();
      var e = e ? e : window.event;
      var nowX = e.clientX;
      var nowY = e.clientY;
      var diffX = nowX - dragParams.currentX;
      var diffY = nowY - dragParams.currentY;
      var left = parseInt(diffX + dragParams.left);
      var top = parseInt(diffY + dragParams.top);
      targetEle.style.left = left + "px";
      targetEle.style.top = top + "px";
    });

  };

  /**
   * 添加绑定事件函数，兼容智障IE浏览器
   * @param {Element} ele 需要添加绑定事件的元素对象
   * @param {string} eventType  必须。字符串，指定事件名
   * @param {function} func 事件触发时执行的函数
   */
  var bindEventFunc = function (ele, eventType, func) {
    if (window.addEventListener) {
      ele.addEventListener(eventType, func, false);
    } else if (window.attachEvent) {
      ele.attachEvent("on" + eventType, func); //兼容智障IE浏览器
    }
  };

  /**
   * 移除绑定事件函数，兼容智障IE浏览器
   * @param {Element} ele 删除绑定事件的元素对象
   * @param {string} eventType  事件名
   * @param {function} func 事件触发时执行的函数
   */
  var removeEvenFunc = function (ele, eventType, func) {
    if (window.removeEventListener) {
      ele.removeEventListener(eventType, func, false);
    } else if (window.datachEvent) {
      ele.datachEvent("on" + eventType, func);
    }
  };




  //3、将插件对象暴露给全局对象
  _global = (function () {
    return this || (0, eval)('this');
  }());
  if (typeof module !== "undefined" && module.exports) {
    module.exports = DragPanel;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return DragPanel;
    });
  } else {
    !('DragPanel' in _global) && (_global.DragPanel = DragPanel);
  }
}());
