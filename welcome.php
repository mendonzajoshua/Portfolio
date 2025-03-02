
<doctype! html>
<html>
	<head>
		<title>Welcome</title>
		<style>
			body{
				background-color:#FBF9F1;
				text-align:center;
				padding:40px;
				border: 2px solid #F4A460;
				margin:20px 40px 20px 40px;
			}
			h3{
				color:black;
				
			}
			
		</style>
	</head>
	
	<body>
		<h3 > Welcome <?php echo $_POST["u_name"]."<br>" ?>
		Your Email ID is <?php echo $_POST["u_email"]; ?><br>
		Your Message is <?php echo $_POST["u_msg"] ?>
		</h3>

		<?php
		$message=array(
		"Hello %s, The Web Designer will Contact you Shortly, feel free to explore all other webpages and Projects",
		"Hello %s, The Web Designer will Contact you Shortly, until then have a Wonderful Day! ",
		"Hello %s, The Web Designer will Contact you Shortly, User Loves you!!!"		);

		$username=$_POST["u_name"];

		$random_msg=$message[array_rand($message)];

		$f_sg=sprintf($random_msg,$username);

		echo $f_sg;
		?>


	</body>
</html>