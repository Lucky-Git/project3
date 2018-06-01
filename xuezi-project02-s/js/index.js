//js/index.js
(()=>{
	ajax({
		type:"get",
		url:"data/index/getProducts.php",
		dataType:"json"
	}).then(products=>{
		console.log(products);
		var html="";
		products.forEach((p,i)=>{
			var {title,details,price,href,pic}=p;
			if(i<2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="details">${details}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`;
			}else if(i==2){
				html+=`<div>
					<div class="desc">
						<p class="name">${title}</p>
						<p class="price">¥${parseFloat(price).toFixed(2)}</p>
						<a href="${href}" class="view">查看详情</a>
					</div>
					<img src="${pic}">
				</div>`	;
			}else{
				html+=`<div class="product">
					<img src="${pic}">
					<p class="name">${title}</p>
					<p class="price">¥${parseFloat(price).toFixed(2)}</p>
					<a href="${href}">查看详情</a>
				</div>`;
			}
		});
		document.querySelector("#f1>div.floor-content").innerHTML=html;
		document.querySelector("#f2>div.floor-content").innerHTML=html;
		document.querySelector("#f3>div.floor-content").innerHTML=html;
	})
})();