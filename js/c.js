
function setHeaderClass() {
    var top = $(document).scrollTop();
    if (top > 0) {
      $("header").addClass("sticky");
    } else {
      $("header").removeClass("sticky");
    }
    if (top > 500) {
      $(".affix-top").css('visibility', 'visible');
    } else {
      $(".affix-top").css('visibility', 'hidden');
    }
  }
  function go(url) {
    location.pathname = url;
  }
  
  function basicTabs(selector, trigger) {
    trigger = trigger || 'mouseenter';
    $(selector)[trigger](function(event) {
      if (event) event.preventDefault();
      var target = $(this).data("target");
      var contentSelector = selector + "-content";
  
      $(selector).removeClass("active");
      $(this).addClass("active");
  
      if (!target) return;
      $(contentSelector).removeClass("active");
      $(target).addClass("active");
  
  
    });
    
  }
  
  /**
   * 
   * 
   * @param {any} contentSelector 内容的容器选择器
   * @param {any} anchorSelector  内容的锚点选择器
   * @param {any} anchorWrapper   锚点的容器  
   */
  function siderBar(contentSelector, anchorSelector, anchorWrapper) {
    let sideBarWrapper = document.createElement('div');
    sideBarWrapper.className = "sideBarWrapper";
  
    let arrow = document.createElement('i');
  
    let wrapperAnchor = document.createElement('ul');
    wrapperAnchor.className = "anchor";
    let innerHtml = "";
    const $content = $(contentSelector);
    const $anchorWrapper = $(anchorWrapper);
    const containerTop = $content.position().top;
    const anchorScrollTop = [];
    $content.find(anchorSelector).each((i, ele) => {
      // anchorScrollTop[ele.id] = $(ele).position().top;
      const id = ele.id || ele.innerText;
      anchorScrollTop.push({
        id: id,
        scrollTop: $(ele).position().top - containerTop
      })
      const anchor = `
        <li>
          <a href="javascript:;" data-id="${id}">${ele.innerText}</a>
        </li>
      `
      innerHtml += anchor;
    });
    wrapperAnchor.innerHTML = innerHtml;
    // $(wrapperAnchor).insertAfter($anchorWrapper);
  
    $(sideBarWrapper).append(wrapperAnchor)
    $(sideBarWrapper).append(arrow);
    $anchorWrapper.append($(sideBarWrapper));
  
    // 容器滚动事件 处理
    let onScroll = function(e) {
  
      const scrollTop = $content.scrollTop();
  
  
      const anchor = anchorScrollTop.find((anchor, i, anchors) => {
        if (scrollTop < anchors[0].scrollTop) return anchors[0];
        if (!anchors[i + 1]) return anchor;
        return scrollTop >= anchor.scrollTop && anchors[i + 1].scrollTop > scrollTop;
      });
      activeAnchor(anchor.id);
    };
    // 激活锚点
    function activeAnchor(id) {
      const anchor_array = $anchorWrapper.find('li');
      anchor_array.each((i, elem) => {
        $(elem).removeClass('active');
      })
      moveArrow(anchor_array.find(`[data-id='${id}']`).parent('li').addClass('active'));
      // moveArrow()
    }
    function moveArrow($activeLi) {
      const top = $activeLi.offset().top - $(sideBarWrapper).offset().top+15;
      $(arrow).css({
        top
      })
    }
    // 监听滚动事件 
    $content.on('scroll', onScroll);
  
    // 默认激活第一个锚点
    activeAnchor(anchorScrollTop[0].id);
  
    // 锚点点击事件
    $(document).delegate('a', 'click', function(e) {
      $content.off('scroll', onScroll)
      const anchorId = $(e.target).data('id');
      activeAnchor(anchorId);
  
      $content.animate({
        scrollTop: anchorScrollTop.find(item => item.id == anchorId).scrollTop
      }, 500, function() {
        $content.on('scroll', onScroll);
      });
    })
  
  }
  
  function setMarkCookie() {
    var cookieList = ['id', 'tag', 'fromyl'];//存储的cookie列表
  
    function urlParam(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)')
        .exec(window.location.href);
      return results && results[1];
    }
  
    var channel = [];
    for (var i = 0; i < cookieList.length; i++) {
      var key = cookieList[i];
      var value = urlParam(key);
  
  
      if (value) {
        channel.push(key + "=" + value);
      }
    }
  
    if (urlParam('fromyl')) {
      channel = channel.join('&');
      Cookies.set('channel', channel, {
        expires: 30,
        domain: '.163yun.com',
      });
    }
  
  }
  
  function ScollPostion() {//滚动条位置
    var t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop;
      l = document.documentElement.scrollLeft;
      w = document.documentElement.scrollWidth;
      h = document.documentElement.scrollHeight;
    } else if (document.body) {
      t = document.body.scrollTop;
      l = document.body.scrollLeft;
      w = document.body.scrollWidth;
      h = document.body.scrollHeight;
    }
    return { top: t, left: l, width: w, height: h };
  }
  
  function whereIsYou({ top }) {
    if (top > 300) {
      $('.desc-selector').addClass('fix-head');
    } else {
      $('.desc-selector').removeClass('fix-head');
    }
  }
  
  $(document).ready(function() {
  
  
    $('.js-inview').one('inview', function(event, isInview) {
      $(this).addClass('s-inview');
      return;
      const reg = /s-inview-(\S+)/
      const match = reg.exec(this.className);
  
      if (isInview) {
        $(this).addClass('animation-' + match[1]);
      }
    });
  
  
  
    whereIsYou(ScollPostion());
  
    $(window).scroll(function(e) {
      const position = ScollPostion();
      whereIsYou(position);
    });
  
    // var isBVisible,isAVisible;
    // var hanldeViewTabs=()=>{
    //   if(isBVisible&&isAVisible){
    //     $('.desc-selector').removeClass('fix-head').addClass('fix-content')
    //     return
    //   }
    //   $('.desc-selector').removeClass('fix-content').addClass('fix-head')
    // }
    // $('.js-selector-before-hook').on('inview',function(_,isInview){
    //   isBVisible=isInview;
    //   console.log(isInview)
    //   console.log(_);
    //   hanldeViewTabs();
    // })
    // $('.js-selector-after-hook').on('inview',function(_,isInview){
    //   console.log(isInview)
    //   isAVisible=isInview;
    //   hanldeViewTabs();
    // })
  
    setHeaderClass();
    setMarkCookie();
  
    basicTabs(".tab-solution");
    basicTabs(".tab-item");
    basicTabs(".patterns-item");
    // basicTabs(".selector-item", 'click');
    basicTabs(".example-item");
    basicTabs(".ad-item", 'click');
    // basicTabs(".menu-item", 'click');
  
    $(document).scroll(function() {
      setHeaderClass();
    });
  
    $(".affix-top").click(function() {
      // ？？？ 静态页面却要用html元素
      $("body").animate({
        scrollTop: 0
      }, '500');
    });
  
  
    // if (service.isLogin()) {
    //   view.login();
    // } else {
    //   view.nologin();
    // }
  
    $('.btn-logout').on('click', function() {
      service.logout();
      location.reload();
    })
  
    var bodyTarget = $(document.body)
    var target = bodyTarget.find('.affix-contacts')
    var canHide = false
  
    // bodyTarget.height($(document).height())
  
    if (target && target[0]) {
      target[0].ontouchstart = function() {
        target.addClass('contacts-hover')
        canHide = false
        var timer = setTimeout(function() {
          canHide = true
        }, 200)
      }
  
      document.body.ontouchstart = function() {
        if (canHide) {
          target.removeClass('contacts-hover')
        }
        // }
        // if (!currentTarget.closest('.affix-contacts').length && !currentTarget.hasClass('affix-contacts')) {
        // target.removeClass('contacts-hover')
        // }
      }
    }
  
    // Cookie.get('youliaoSession')
    // $('.login').show();
  });
  
  var view = {
    login: function() {
      $('.state_login').show();
      $('.state_nologin').hide();
    },
    nologin: function() {
      $('.state_login').hide();
      $('.state_nologin').show();
    }
  }
  
  
  var service = {
    isLogin: function() {
      return !!(Cookies.get('userId') &&
        Cookies.get('userName') &&
        Cookies.get('youliaoSession'));
    },
    logout: function() {
      Cookies.remove('sessionId');
      Cookies.remove('userId');
      Cookies.remove('userName');
      Cookies.remove('youliaoSession');
    }
  }