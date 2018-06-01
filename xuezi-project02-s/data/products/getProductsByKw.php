<?php
//data/products/getProductsByKw.php
require_once("../init.php");
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
$output=[
	"count"=>0,
	"pageSize"=>9,
	"pageCount"=>0,//=ceil(count/pageSize)
	"pno"=>0,
	"products"=>[]
];
if($pno!=null&&$kw!=null){
	$output["pno"]=$pno;
	//mac 256g i7
	//按空格切割: [mac, 256g, i7]
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++)//遍历
		//将当前元素变为title like '%当前元素%'
		$kws[$i]=" title like '%".$kws[$i]."%' ";
	//[title like '%mac%' , title like '%256g%' , title like '%i7%']
	//用and连接每个元素
	$where=" where ".implode(" and ",$kws);
	//title like '%mac%' and title like '%256g%' and title like '%i7%'
	$sql="select count(*) from xz_laptop $where";
	$result=mysqli_query($conn,$sql);
	$output["count"]=mysqli_fetch_row($result)[0];
	$output["pageCount"]=
		ceil($output["count"]/$output["pageSize"]);
	//分页
	$start=$output["pno"]*$output["pageSize"];
	$sql="select *,(select md from xz_laptop_pic where laptop_id=lid limit 1) as md from xz_laptop $where limit $start,".$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$output["products"]=mysqli_fetch_all($result,1);

}
echo json_encode($output);