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
    this.resizePanel();
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
      +'<div class="resizeL"></div>'
      +'<div class="resizeR"></div>'
      +'<div class="resizeT"></div>'
      +'<div class="resizeB"></div>'
      +'<div class="resizeLT"></div>'
      +'<div class="resizeTR"></div>'
      +'<div class="resizeBR"></div>'
      +'<div class="resizeLB"></div>'
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
        this.releaseCapture && this.releaseCapture();
      };
      this.setCapture && this.setCapture();
      return false;
    };

  };

  /**
   * 改变div大小
   */
  DragPanel.prototype.resizePanel = function(){
    var targetEle = document.getElementById('targetEle');
    //四个边
    var resizeL = document.querySelector('#targetEle .resizeL');
    var resizeT = document.querySelector('#targetEle .resizeT');
    var resizeR = document.querySelector('#targetEle .resizeR');
    var resizeB = document.querySelector('#targetEle .resizeB');
    //四个角
    var resizeLT = document.querySelector('#targetEle .resizeLT');
    var resizeTR = document.querySelector('#targetEle .resizeTR');
    var resizeLB = document.querySelector('#targetEle .resizeLB');
    var resizeBR = document.querySelector('#targetEle .resizeBR');

    //四边拖动 div
    resizeDiv(targetEle,resizeL,true,false,false,true);
    resizeDiv(targetEle,resizeT,false,true,true,false);
    resizeDiv(targetEle,resizeR,false,false,false,true);
    resizeDiv(targetEle,resizeB,false,false,true,false);

    //四角拖动 div
    resizeDiv(targetEle,resizeLT,true,true,false,false);
    resizeDiv(targetEle,resizeTR,false,true,false,false);
    resizeDiv(targetEle,resizeLB,true,false,false,false);
    resizeDiv(targetEle,resizeBR,false,false,false,false);

    //初始化设置 div 的位置
    targetEle.style.left = (document.documentElement.clientWidth - targetEle.offsetWidth) / 2 + "px";
    targetEle.style.top = (document.documentElement.clientHeight - targetEle.offsetHeight) / 2 + "px";
  };

  /**
   * 拖动 div  四边和四角改变 div 宽度和高度
   * @param {Element} parentEle 父级Div
   * @param {Element} beMoveEle 触发拖动的元素
   * @param {boolean} isLeft 是否左边
   * @param {boolean} isTop 是否顶部
   * @param {boolean} lockX 是否锁定 X 轴
   * @param {boolean} lockY 是否锁定 Y 轴
   */
  var resizeDiv = function(parentEle,beMoveEle,isLeft,isTop,lockX,lockY){
    //默认宽度和高度
    var dragMinWidth = 499;
    var dragMinHeight = 404;
    beMoveEle.onmousedown = function(e){
      //鼠标按下的坐标点 减去 边框的偏移量 等于 鼠标到边框的坐标位置(宽度，高度)
      var diffX = e.clientX - beMoveEle.offsetLeft;
      var diffY = e.clientY - beMoveEle.offsetTop;
      //获取父级div width , height, top ,left
      var parentEleWidth = parentEle.offsetWidth;
      var parentEleHeight = parentEle.offsetHeight;
      var parentEleTop = parentEle.offsetTop;
      var parentEleLeft = parentEle.offsetLeft;
      document.onmousemove = function(e){
        //1、计算鼠标移动的坐标点(实际上就是移动的宽度和高度)
        var beMoveDistanceX = e.clientX - diffX;
        var beMoveDistanceY = e.clientY - diffY;
        //2、计算可拖动div在浏览器中最大宽度和最大高度 
        var maxWidth = document.documentElement.clientWidth - parentEle.offsetLeft - 2;
        var maxHeight = document.documentElement.clientHeight - parentEle.offsetTop - 2;
        var beMoveDistanceWidth = isLeft ? parentEleWidth - beMoveDistanceX : beMoveEle.offsetWidth + beMoveDistanceX;
        var beMoveDistanceHeight = isTop ? parentEleHeight - beMoveDistanceY : beMoveEle.offsetHeight + beMoveDistanceY;
        //3、不让拖动的的宽度和高度超出浏览器的宽度和高度
        beMoveDistanceX > maxWidth && (beMoveDistanceWidth = maxWidth);
        beMoveDistanceY > maxHeight && (beMoveDistanceHeight = maxHeight);
        //4、如果拖动左边框或者顶部边框，需要给div设置left，top
        isLeft && (parentEle.style.left = parentEleLeft + beMoveDistanceX + "px");
        isTop && (parentEle.style.top = parentEleTop + beMoveDistanceY + "px");
        //5、拖动的 div 不能超过默认设置div 的宽度和高度
        beMoveDistanceWidth < dragMinWidth && (beMoveDistanceWidth = dragMinWidth);
        beMoveDistanceWidth > maxWidth && (beMoveDistanceWidth = maxWidth);
        lockX || (parentEle.style.width = beMoveDistanceWidth + "px");
        //parentEle.style.width = beMoveDistanceWidth + "px";
        beMoveDistanceHeight < dragMinHeight && (beMoveDistanceHeight = dragMinHeight);
        beMoveDistanceHeight > maxHeight && (beMoveDistanceHeight = maxHeight);
        lockY || (parentEle.style.height = beMoveDistanceHeight + "px");
        //parentEle.style.height = beMoveDistanceHeight + "px";
        //6、如果拖动的距离等于默认最小的宽度和高度就不在执行，如果不判断的话，鼠标可以一直拖动；不让鼠标拖动位置超出浏览器的宽度和高度
        if ((isLeft && beMoveDistanceWidth == dragMinWidth) || (isTop && beMoveDistanceHeight == dragMinHeight) || (isTop && e.clientY == 0) ) document.onmousemove = null;
        return false;
      };

      document.onmouseup = function(e){
        document.onmousemove = null;
        document.onmouseup = null;
      }
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
