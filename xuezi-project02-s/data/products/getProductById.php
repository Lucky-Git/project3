<?php
require_once("../init.php");
$output=[
	"product"=>[],
	"specs"=>[],
	"pics"=>[]
];
@$lid=$_REQUEST['lid'];
if($lid!=null){
	$sql="select * from xz_laptop where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$output["product"]=mysqli_fetch_all($result,1)[0];
	$sql="select * from xz_laptop_pic where laptop_id=$lid";
	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);
	$family_id=$output["product"]["family_id"];
	$sql="select lid,spec from xz_laptop where family_id=$family_id";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);



?>