/**
 * @fileOverview \u9009\u62e9\u6846\u547d\u540d\u7a7a\u95f4\u5165\u53e3\u6587\u4ef6
 * @ignore
 */define("bui/tree",["bui/common","bui/tree/treemixin","bui/tree/treelist"],function(e){var t=e("bui/common"),n=t.namespace("Tree");return t.mix(n,{TreeList:e("bui/tree/treelist"),Mixin:e("bui/tree/treemixin")}),n}),define("bui/tree/treemixin",["bui/common","bui/data"],function(e){function t(e,t){return r.isString(t)&&(t=e.findNode(t)),t}function n(e,t,n){setTimeout(function(){e()},t/n)}var r=e("bui/common"),i=e("bui/data"),s="expanded",o="loading",u="checked",a="partial-checked",f={NONE:"none",ALL:"all",CUSTOM:"custom",ONLY_LEAF:"onlyLeaf"},l="x-tree-icon",c="x-tree-elbow",h="x-tree-show-line",p=c+"-",d=l+"-wraper",v=p+"line",m=p+"end",g=p+"empty",y=p+"expander",b=l+"-checkbox",w=y+"-end",E=function(){};return E.ATTRS={store:{getter:function(e){if(!e){var t=this,n=new i.TreeStore({root:t.get("root"),data:t.get("nodes")});return t.setInternal("store",n),n}return e}},root:{},nodes:{sync:!1},iconContainer:{},iconWraperTpl:{value:'<span class="'+d+'">{icons}</span>'},showLine:{value:!1},showIcons:{value:!0},iconTpl:{value:'<span class="x-tree-icon {cls}"></span>'},leafCls:{value:p+"leaf"},dirCls:{value:p+"dir"},checkType:{value:"custom"},accordion:{value:!1},checkedField:{valueFn:function(){return this.getStatusField("checked")}},itemStatusFields:{value:{expanded:"expanded",disabled:"disabled",checked:"checked"}},dirSelectable:{value:!0},showRoot:{value:!1},events:{value:{expanded:!1,collapsed:!1,checkedchange:!1}},expandEvent:{value:"itemdblclick"},expandAnimate:{value:!1},collapseEvent:{value:"itemdblclick"},startLevel:{value:1}},r.augment(E,{collapseAll:function(){var e=this,t=e.get("view").getAllElements();r.each(t,function(t){var n=e.getItemByElement(t);n&&e._collapseNode(n,t,!0)})},collapseNode:function(e){var t=this,n;r.isString(e)&&(e=t.findNode(e));if(!e)return;n=t.findElement(e),t._collapseNode(e,n)},expandAll:function(){var e=this,t=e.get("view").getAllElements();r.each(t,function(t){var n=e.getItemByElement(t);e._expandNode(n,t,!0)})},expandNode:function(e,t){var n=this,i;r.isString(e)&&(e=n.findNode(e));if(!e)return;e.parent&&!n.isExpanded(e.parent)&&n.expandNode(e.parent),i=n.findElement(e),n._expandNode(e,i,t)},expandPath:function(e,t,n){if(!e)return;n=n||0;var r=this,i=r.get("store"),s,o,u,a,f=e.split(",");s=r.findNode(f[n]);for(u=n+1;u<f.length;u++){a=f[u],o=r.findNode(a,s);if(s&&o)r.expandNode(s),s=o;else if(s&&t){i.load({id:s.id},function(){o=r.findNode(a,s),o&&r.expandPath(e,t,u)});break}}},findNode:function(e,t){return this.get("store").findNode(e,t)},getCheckedLeaf:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return e.leaf&&t.isChecked(e)},e)},getCheckedNodes:function(e){var t=this,n=t.get("store");return n.findNodesBy(function(e){return t.isChecked(e)},e)},isItemSelectable:function(e){var t=this,n=t.get("dirSelectable"),r=e;return r&&!n&&!r.leaf?!1:!0},isExpanded:function(e){if(!e||e.leaf)return!1;var t=this,n;return t._isRoot(e)&&!t.get("showRoot")?!0:(r.isString(e)&&(item=t.getItem(e)),n=t.findElement(e),this._isExpanded(e,n))},isChecked:function(e){return e?e[this.get("checkedField")]:!1},toggleExpand:function(e){var t=this,n;r.isString(e)&&(item=t.getItem(e)),n=t.findElement(e),t._toggleExpand(e,n)},setNodeChecked:function(e,n,i){i=i==null?!0:i;if(!e)return;var s=this,o,a;e=t(this,e);if(!e)return;o=e.parent;if(!s.isCheckable(e))return;if(s.isChecked(e)!==n||s.hasStatus(e,"checked")!==n)a=s.findElement(e),a?(s.setItemStatus(e,u,n,a),s._resetPatialChecked(e,n,n,a)):s.isItemDisabled(e)||s.setStatusValue(e,"checked",n),o&&(s.isChecked(o)!=n?s._resetParentChecked(o):s._resetPatialChecked(o,null,null,null,!0)),s.fire("checkedchange",{node:e,element:a,checked:n});!e.leaf&&i&&r.each(e.children,function(e){s.setNodeChecked(e,n,i)})},setChecked:function(e){this.setNodeChecked(e,!0)},clearAllChecked:function(){var e=this,t=e.getCheckedNodes();r.each(t,function(t){e.setNodeChecked(t,!1)})},_initRoot:function(){var e=this,t=e.get("store"),n,i=e.get("showRoot"),s;t&&(n=t.get("root"),e.setInternal("root",n),i?s=[n]:s=n.children,r.each(s,function(t){e._initChecked(t,!0)}),e.clearItems(),e.addItems(s))},_initChecked:function(e,t){var n=this,i=n.get("checkType"),s=n.get("checkedField"),o;if(i===f.NONE){delete e[s];return}if(i===f.ONLY_LEAF){e.leaf?e[s]=e[s]||!1:(delete e[s],t&&r.each(e.children,function(e){n._initChecked(e,t)}));return}i===f.ALL&&(e[s]=e[s]||!1);if(!e||!n.isCheckable(e))return;o=e.parent,n.isChecked(e)||(o&&n.isChecked(o)&&n.setStatusValue(e,"checked",!0),e.children&&e.children.length&&n._isAllChildrenChecked(e)&&n.setStatusValue(e,"checked",!0)),t&&r.each(e.children,function(e){n._initChecked(e,t)})},_resetPatialChecked:function(e,t,n,r,i){if(!e||e.leaf)return!0;var s=this,n;t=t==null?s.isChecked(e):t;if(t){s.setItemStatus(e,a,!1,r);return}n=n==null?s._hasChildChecked(e):n,s.setItemStatus(e,a,n,r),i&&e.parent&&s._resetPatialChecked(e.parent,!1,n?n:null,null,i)},_resetParentChecked:function(e){if(!this.isCheckable(e))return;var t=this,n=t._isAllChildrenChecked(e);t.setStatusValue(e,"checked",n),t.setNodeChecked(e,n,!1),t._resetPatialChecked(e,n,null,null)},__bindUI:function(){var e=this,t=e.get("el");e.on("itemclick",function(t){var n=$(t.domTarget),r=t.element,i=t.item;if(n.hasClass(y))return e._toggleExpand(i,r),!1;if(n.hasClass(b)){var s=e.isChecked(i);e.setNodeChecked(i,!s)}}),e.on("itemrendered",function(t){var n=t.item,r=t.domTarget;e._resetIcons(n,r),e.isCheckable(n)&&e._resetPatialChecked(n,null,null,r),e._isExpanded(n,r)&&e._showChildren(n)}),e._initExpandEvent()},_initExpandEvent:function(){function i(t){return function(n){var r=$(n.domTarget),i=n.element,s=n.item;r.hasClass(y)||e[t](s,i)}}var e=this,t=e.get("el"),n=e.get("expandEvent"),r=e.get("collapseEvent");n==r?e.on(n,i("_toggleExpand")):(n&&e.on(n,i("_expandNode")),r&&e.on(r,i("_collapseNode")))},_isAllChildrenChecked:function(e){if(!e||e.leaf)return!1;var t=this,n=e.children,i=!0;return r.each(n,function(e){i=i&&t.isChecked(e);if(!i)return!1}),i},_hasChildChecked:function(e){if(!e||e.leaf)return!1;var t=this;return t.getCheckedNodes(e).length!=0},_isRoot:function(e){var t=this,n=t.get("store");return n&&n.get("root")==e?!0:!1},_setLoadStatus:function(e,t,n){var r=this;r.setItemStatus(e,o,n,t)},_beforeLoadNode:function(e){var t=this,n;r.isString(e)&&(e=t.findNode(e)),n=t.findElement(e),n?(t._collapseNode(e,n),t._setLoadStatus(e,n,!0)):e&&r.each(e.children,function(e){t._removeNode(e)})},onBeforeLoad:function(e){var t=this,n=e.params,r=n.id,i=t.findNode(r)||t.get("root");t._beforeLoadNode(i)},_addNode:function(e,t){var n=this,r=e.parent,i,s,o,u;n._initChecked(e,!0),r?(n.isExpanded(r)&&(i=r.children.length,u=n._getInsetIndex(e),n.addItemAt(e,u),t==i-1&&t>0&&(s=r.children[t-1],n._updateIcons(s))),n._updateIcons(r)):(u=n._getInsetIndex(e),n.addItemAt(e,u),s=n.get("nodes")[t-1],n._updateIcons(s))},_getInsetIndex:function(e){var t=this,n,r=null;return n=t._getNextItem(e),n?t.indexOfItem(n):t.getItemCount()},_getNextItem:function(e){var t=this,n=e.parent,i,s,o=null;return n?(i=n.children,s=r.Array.indexOf(e,i),o=i[s+1],o||t._getNextItem(n)):null},onAdd:function(e){var t=this,n=e.node,r=e.index;t._addNode(n,r)},_updateNode:function(e){var t=this;t.updateItem(e),t._updateIcons(e)},onUpdate:function(e){var t=this,n=e.node;t._updateNode(n)},_removeNode:function(e,t){var n=this,r=e.parent,i,s;n.collapseNode(e);if(!r)return;n.removeItem(e),n.isExpanded(r)&&(i=r.children.length,i==t&&t!==0&&(s=r.children[t-1],n._updateIcons(s))),n._updateIcons(r),n._resetParentChecked(r)},onRemove:function(e){var t=this,n=e.node,r=e.index;t._removeNode(n,r)},_loadNode:function(e){var t=this;t._initChecked(e,!0),t.expandNode(e),t._updateIcons(e),t.setItemStatus(e,o,!1)},__syncUI:function(){var e=this,t=e.get("store"),n=e.get("showRoot");n&&!t.hasData()&&e._initRoot()},onLoad:function(e){var t=this,n=t.get("store"),r=n.get("root"),i;(!e||e.node==r)&&t._initRoot(),e&&e.node&&t._loadNode(e.node)},_isExpanded:function(e,t){return this.hasStatus(e,s,t)},_getIconsTpl:function(e){var t=this,n=e.level,i=t.get("startLevel"),s=t.get("iconWraperTpl"),o=[],u;for(u=i;u<n;u+=1)o.push(t._getLevelIcon(e,u));return o.push(t._getExpandIcon(e)),o.push(t._getCheckedIcon(e)),o.push(t._getNodeTypeIcon(e)),r.substitute(s,{icons:o.join("")})},_getCheckedIcon:function(e){var t=this,n=t.isCheckable(e);return n?t._getIcon(b):""},isCheckable:function(e){return e[this.get("checkedField")]!=null},_getExpandIcon:function(e){var t=this,n=y;return e.leaf?t._getLevelIcon(e):(t._isLastNode(e)&&(n=n+" "+w),t._getIcon(n))},_getNodeTypeIcon:function(e){var t=this,n=e.cls?e.cls:e.leaf?t.get("leafCls"):t.get("dirCls");return t._getIcon(n)},_getLevelIcon:function(e,t){var n=this,r=n.get("showLine"),i=g,s;return r&&(e.level===t||t==null?i=n._isLastNode(e)?m:c:(s=n._getParentNode(e,t),i=n._isLastNode(s)?g:v)),n._getIcon(i)},_getParentNode:function(e,t){var n=e.level,r=e.parent,i=n-1;if(n<=t)return null;while(i>t)r=r.parent,i-=1;return r},_getIcon:function(e){var t=this,n=t.get("iconTpl");return r.substitute(n,{cls:e})},_isLastNode:function(e){if(!e)return!1;if(e==this.get("root"))return!0;var t=this,n=e.parent,r=n?n.children:t.get("nodes"),i;return i=r.length,r[i-1]===e},_initNodes:function(e,t,n){var i=this;r.each(e,function(e){e.level=t,e.leaf==null&&(e.leaf=e.children?!1:!0),n&&!e.parent&&(e.parent=n),i._initChecked(e),e.children&&i._initNodes(e.children,t+1,e)})},_collapseNode:function(e,t,n){var r=this;if(e.leaf)return;r.hasStatus(e,s,t)&&(r.setItemStatus(e,s,!1,t),n?(r._collapseChildren(e,n),r.removeItems(e.children)):r._hideChildrenNodes(e),r.fire("collapsed",{node:e,element:t}))},_hideChildrenNodes:function(e){var t=this,n=e.children,i=[];r.each(n,function(e){var n=t.findElement(e);n&&(i.push(n),t._hideChildrenNodes(e))}),t.get("expandAnimate")?(i=$(i),i.animate({height:0},function(){t.removeItems(n)})):t.removeItems(n)},_collapseChildren:function(e,t){var n=this,i=e.children;r.each(i,function(e){n.collapseNode(e,t)})},_expandNode:function(e,t,n){var i=this,o=i.get("accordion"),u=i.get("store");if(e.leaf)return;if(!i.hasStatus(e,s,t)){if(o&&e.parent){var a=e.parent.children;r.each(a,function(t){t!=e&&i.collapseNode(t)})}u&&!u.isLoaded(e)?i._isLoading(e,t)||u.loadNode(e):t&&(i.setItemStatus(e,s,!0,t),i._showChildren(e),i.fire("expanded",{node:e,element:t}))}r.each(e.children,function(e){(n||i.isExpanded(e))&&i.expandNode(e,n)})},_showChildren:function(e){if(!e||!e.children)return;var t=this,n=t.indexOfItem(e),r=e.children.length,i,s=r-1,o=[];for(s=r-1;s>=0;s--)i=e.children[s],t.getItem(i)||(t.get("expandAnimate")?(el=t._addNodeAt(i,n+1),el.hide(),el.slideDown()):t.addItemAt(i,n+1))},_addNodeAt:function(e,t){var n=this,r=n.get("items");return t===undefined&&(t=r.length),r.splice(t,0,e),n.addItemToView(e,t)},_isLoading:function(e,t){var n=this;return n.hasStatus(e,o,t)},_resetIcons:function(e,t){if(!this.get("showIcons"))return;var n=this,r=n.get("iconContainer"),i,s=n._getIconsTpl(e);$(t).find("."+d).remove(),i=$(t).find(r).first(),r&&i.length?$(s).prependTo(i):$(t).prepend($(s))},_toggleExpand:function(e,t){var n=this;n._isExpanded(e,t)?n._collapseNode(e,t):n._expandNode(e,t)},_updateIcons:function(e){var t=this,n=t.findElement(e);n&&(t._resetIcons(e,n),t._isExpanded(e,n)&&!e.leaf&&r.each(e.children,function(e){t._updateIcons(e)}))},_uiSetShowRoot:function(e){var t=this,n=this.get("showRoot")?0:1;t.set("startLevel",n)},_uiSetNodes:function(e){var t=this,n=t.get("store");n.setResult(e)},_uiSetShowLine:function(e){var t=this,n=t.get("el");e?n.addClass(h):n.removeClass(h)}}),E}),define("bui/tree/treelist",["bui/common","bui/list","bui/tree/treemixin"],function(e){var t=e("bui/common"),n=e("bui/list"),r=e("bui/tree/treemixin"),i=n.SimpleList.extend([r],{},{ATTRS:{itemCls:{value:t.prefix+"tree-item"},itemTpl:{value:'<li class="{cls}">{text}</li>'},idField:{value:"id"}}},{xclass:"tree-list"});return i});
