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
   * 
   * @param {*} imagesAry 图片对象 
   */
  DragPanel.prototype.initial = function () {
   
    var strHtml = createPicMagnifier();
    document.body.innerHTML = strHtml;

  };

  /**
   * 创建 插件静态模板字符串 html 
   */
  var createPicMagnifier = function () {
    var strHtml =
      '<div class="pp-modal-mask"></div><div class="pp-modal-wrap">'
      + '<div class="pp-modal-wrap" id="drag">'
      + '<div class="pp-modal" id="ppmodal" style="width: 500px; transform-origin: -30px 431px 0px;">'
      + '<div class="pp-modal-content" id="pmc">'
      + '<button aria-label="Close" class="pp-modal-close"><span class="pp-modal-close-x"></span></button>'
      + '<div class="pp-modal-header"><div class="pp-modal-title" id="rcDialogTitle2">图片预览</div></div>'
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
      + '</div>'
      + '</div>'
      + '</div>';
    return strHtml;

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
