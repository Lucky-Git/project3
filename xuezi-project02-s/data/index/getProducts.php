<?php

require_once("../init.php");
$sql="SELECT * FROM `xz_index_product` WHERE seq_recommended!=0 ORDER BY seq_recommended";
$result=mysqli_query($conn,$sql);
echo json_encode(mysqli_fetch_all($result,1));

?>