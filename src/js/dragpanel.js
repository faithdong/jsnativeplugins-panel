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
      + '<button aria-label="Close" class="pp-modal-close" ><span class="pp-modal-close-x">-</span></button>'
      + '<button aria-label="Close" class="pp-modal-close" id="closebtn"><span class="pp-modal-close-x">X</span></button>'
      + '<div class="pp-modal-header" id="dragEle"><div class="pp-modal-title" id="rcDialogTitle2">弹框拖动插件</div></div>'
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
      var drag = document.getElementById('targetEle');
      targetEle.remove();
    }
  };


  /**
   * 拖拽
   */
  DragPanel.prototype.drag = function () {
    var targetEle = document.getElementById('targetEle');
    var dragEle = document.getElementById('dragEle');

    var dragParams = {
      left: 0,
      top: 0,
      currentX: 0,
      currentY: 0
    };

    dragEle.onmousedown = function (e) {
      e.preventDefault();
      var e = e ? e : window.event;
      //1、获取拖拽窗口的偏移量
      dragParams.left = targetEle.offsetLeft;
      dragParams.top = targetEle.offsetTop;
      //2、获取当前鼠标坐标点
      dragParams.currentX = e.clientX;
      dragParams.currentY = e.clientY;
      document.body.onmousemove = function (e) {
        e.preventDefault();
        var e = e ? e : window.event;
        console.log('鼠标坐标：'+ e.clientX + '---' + e.clientY);
        var nowX = e.clientX;
        var nowY = e.clientY;
        var diffX = nowX - dragParams.currentX;
        var diffY = nowY - dragParams.currentY; 
        var maxTop = document.body.offsetHeight - targetEle.offsetHeight,
        maxLeft = document.body.offsetWidth - targetEle.offsetWidth;
        if (dragParams.top < 0) dragParams.top = 0;
        if (dragParams.top > maxTop) top = maxTop;
        if (dragParams.left < 0) dragParams.left = 0;
        if (dragParams.left > maxLeft) dragParams.left = maxLeft;
        var left = parseInt(diffX + dragParams.left);
        var top = parseInt(diffY + dragParams.top);
        targetEle.style.left = left + "px";
        targetEle.style.top = top + "px";
      };

      document.body.onmouseup = function (e) {
        document.body.onmousemove = null;
        document.body.onmouseup = null;
      };
    };

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
