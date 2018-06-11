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
    this.minPanel();
    this.revertPanel();
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
      //+ '<button aria-label="Close" class="pp-modal-close" id="maxbtn" style="right:36px;"><span class="pp-modal-close-x"><a class="min" href="javascript:;" title="最大化"><img src="./images/max.png"/></a></span></button>'
      + '<button aria-label="Close" class="pp-modal-close" id="minbtn" style="right:36px;top:5px"><span class="pp-modal-close-x"><a href="javascript:;" title="最小化"><img src="./images/min.png"/></a></span></button>'
      //+ '<button aria-label="Close" class="pp-modal-close" id="revertbtn" style="right:70px;top:5px"><span class="pp-modal-close-x"><img src="./images/revert.png"/></span></button>'
      + '<button aria-label="Close" class="pp-modal-close" id="closebtn"><span class="pp-modal-close-x"><a  href="javascript:;" title="关闭"><img src="./images/close.png"/></a></span></button>'
      + '<div class="pp-modal-header" id="dragEle"><div class="pp-modal-title" id="rcDialogTitle2">弹框拖动插件</div></div>'
      + '<div class="pp-modal-body">'
      + '<div class="pp-scale">'
      + '<div class="pp-card pp-card-bordered" id="normalimgdiv">'
      + '<img alt="example" width="100% " style="vertical-align: middle; height: 350px;" src="./images/img3.jpg" >'
      + '</div>'
      + '<div class="pp-card">'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>'
      +'<div class="min" style="display:none" id="revertwin">'
      +'<button aria-label="Close" class="pp-modal-close" id="revertbtn" style="right:0px;top:5px"><span class="pp-modal-close-x"><a href="javascript:;" title="还原"><img src="./images/revert.png"/></a></span></button>'
      +'</div>';
    // + '</div>'
    // + '</div>'
    // + '</div>';
    return strHtml;

  };


  /**
   * 关闭
   */
  DragPanel.prototype.close = function () {
    var closebtn = document.getElementById('closebtn');
    var revertwin = document.getElementById('revertwin');
    closebtn.onclick = function (e) {
      var drag = document.getElementById('targetEle');
      targetEle.remove();
      revertwin.remove();
    }
  };

  /**
   * 最小化
   */
  DragPanel.prototype.minPanel = function(){
    var targetEle = document.getElementById('targetEle');
    var revertwin = document.getElementById('revertwin');
    minbtn.onclick = function(){
      targetEle.style.display = 'none';
      revertwin.style.display = 'block';
    }
  };

  /**
   * 窗口还原
   */
  DragPanel.prototype.revertPanel = function(){
    var revertbtn = document.getElementById('revertbtn');
    var targetEle = document.getElementById('targetEle');
    var revertwin = document.getElementById('revertwin');
    revertbtn.onclick = function(){
      targetEle.style.display = 'block';
      revertwin.style.display = 'none';
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
      top: 0
    };

    dragEle.onmousedown = function (e) {
      e.preventDefault();
      var e = e ? e : window.event;
      //1、获取拖拽窗口的偏移量（被拖拽DIV的坐标位置）
      dragParams.left = targetEle.offsetLeft;
      dragParams.top = targetEle.offsetTop;
      //2、计算当前被拖拽DIV的坐标位置 与 鼠标坐标位置之间的距离
      var diffX = e.clientX - dragParams.left;
      var diffY = e.clientY - dragParams.top;
      document.onmousemove = function (e) {
        e.preventDefault();
        var e = e ? e : window.event;
        console.log('鼠标坐标：' + e.clientX + '---' + e.clientY);
        //1、被拖拽的距离坐标点
        var beMoveDistanceX = e.clientX - diffX;
        var beMoveDistanceY = e.clientY - diffY;
        var maxL = document.documentElement.clientWidth - targetEle.offsetWidth;
        var maxT = document.documentElement.clientHeight - targetEle.offsetHeight;
        //2、不让div超出浏览器窗口（不会出现滚动条）
        beMoveDistanceX <= 0 && (beMoveDistanceX = 0);
        beMoveDistanceY <= 0 && (beMoveDistanceY = 0);
        beMoveDistanceX >= maxL && (beMoveDistanceX = maxL);
        beMoveDistanceY >= maxT && (beMoveDistanceY = maxT);
        //最终拖拽坐标点
        targetEle.style.left = beMoveDistanceX + 'px';
        targetEle.style.top = beMoveDistanceY + 'px';

      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
        this.releaseCapture && this.releaseCapture()
      };
      this.setCapture && this.setCapture();
      return false;
    };

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
