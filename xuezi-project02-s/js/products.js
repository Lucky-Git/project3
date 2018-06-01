(()=>{
	//不需要重复做的就提出来，提高效率
	var list=document.getElementById("show-list");
	list.onclick=function(e){
			var span=e.target;
			if(span.className=="reduce"||span.className=="add"){
				var input=span.parentNode.children[1];
				var n=parseInt(input.value);
				if(span.className=="add"){
					n++;
				}else if(n>1){
					n--;
				}
				input.value=n;
			}
	}
	var pages=document.getElementById("pages");
	pages.onclick=function(e){
		var a=e.target;
		if(a.nodeName=="A"){
			if(a.className.indexOf("disabled")==-1
				&&a.className.indexOf("current")==-1){
				switch (a.className){
				case "previous":
					var curr=document.querySelector("a.current");
					var pno=curr.innerHTML-1-1;//curr.innerHTML代表网页中的页码，转到程序中对应要-1，而现在要找上一页，故要再-1
					loadPage(pno);
					break;
				case "next":
					var curr=document.querySelector("a.current");
					var pno=curr.innerHTML
					loadPage(pno);
					break;
				default:
					loadPage(a.innerHTML-1);
					
				}
			}
		}
	}
	function loadPage(pno=0){
		var kw=location.search.split("=")[1];
		ajax({
			type:"get",
			url:"data/products/getProductsByKw.php",
			data:{kw,pno},
			dataType:"json"
		}).then(output=>{
			console.log(output);
			var {products,pageCount}=output;
			var html="";
			for(var p of products){
				var {lid,md,title,price}=p;
				html+=`<li>
				<a href="product_details.html?lid=${lid}">
					<img src="${md}" alt="${title}">
				</a>
				<p><span class="price">¥${parseFloat(price).toFixed(2)}</span>
				<a href="product_details.html?lid=${lid}">${title}</a>
				</p>
				<div>
					<span class="reduce">-</span>
					<input type="text" value="1">
					<span class="add">+</span>
					<a href="javascript:;" data-lid="${lid}" 
					class="addCart">加入购物车</a>
				</div>
				</li>`;
			}
		
		list.innerHTML=html;
		var html=`<a href="javascript:;" 
			class="previous">上一页</a>`;
		for(var i=0;i<pageCount;i++){
			if(i!=pno){
				html+=`<a href="javascript:;">${i+1}</a>`;
			}else{
				html+=`<a href="javascript:;" 
					class="current">${i+1}</a>`;
			}
		}
		html+=`<a href="javascript:;" class="next">下一页</a>`;
		
		pages.innerHTML=html;
		if(pno==0){
			pages.firstElementChild.className+=" disabled";
		}
		if(pno==pageCount-1){
			pages.lastElementChild.className+=" disabled";
		}

		


		})
	}
	loadPage();
})();