((w)=>{
	if (!w.G_G){
		w.G_G = {}
	}
	/**
	 * 将节点的transform属性保存到节点上,此方法读写合体，读transformCss(node,name),写transformCss(node,name,value)
	 * @param node 移动的节点
	 * @param name 移动的属性
	 * @param value 移动的距离
	 */
	w.G_G.transformCss = function (node,name,value) {
		//判断是否有Transform属性
		if (!node.transform) {
			node.transform = {}
		}

		//判断参数的长度
		if (arguments.length>2){//赋值操作
			//传入自定义对象
			node.transform[name] = value;

			let result = '';
			//根据传入的name不同加不一样的单位
			// 枚举每一个属性
			for (let i in node.transform) {
				switch (i) {
					case 'translateX':
					case 'translateY':
					case 'translate':
						result += `${i}(${node.transform[i]}px)`;
						break;
					case 'scale':
					case 'scaleX':
					case 'scaleY':
						result += `${i}(${node.transform[i]})`;
						break;
					case 'rotate':
					case 'skewX':
					case 'skewY':
					case 'skew':
						result += `${i}(${node.transform[i]}deg)`;
						break;
				}
			}

			node.style.transform = result;

		} else {//取值操作//返回的是数值

			if (!node.transform[name]){//没有相关属性存在，就返回css默认值
				if (name === 'scale'|| name === 'scaleX' || name === 'scaleY' ) {
					return 1;
				}
				return 0;
			}else {//相关值存在
				return node.transform[name];
			}

		}

	}

})(window);