<?php 

	$month = $_GET['month'];
	if(isset($_GET['candSelections'])){
		$candSelections = json_decode($_GET['candSelections']);
	}
	
	$location = 'sqlite:expendituresDB.db';
	$db = new PDO($location) or die("<p>Database connection failed.</p>");
    
	$sql = "select standardName, amount, recipientName, description, date from expenditures where shortDate='$month'";
	$countsql = "select count(*) from expenditures where shortDate='$month'";
	
	if(isset($_GET['candSelections'])){
		$i = 0;
		$sql = $sql . " and (";
		$countsql = $countsql . " and (";
		foreach($candSelections as $key => $candidate){
			if($i!=0){
				$sql = $sql . " or ";
				$countsql = $countsql . " or ";
			}
			$sql = $sql . "standardName='$candidate'";
			$countsql = $countsql . "standardName='$candidate'";
			$i++;
		}
		$sql = $sql . ")";
		$countsql = $countsql . ")";
	}
	
	if(isset($_GET['filterOption'])){
		if($_GET['filterOption'] != 'Total'){
		$sql = $sql . " and expendCategory='" . $_GET['filterOption'] . "'";
		$countsql = $countsql . " and expendCategory='" . $_GET['filterOption'] . "'";
		}
	}
	
	$sql = $sql . " order by recipientName";
	$countsql = $countsql . " order by recipientName";
	
	$countResult = $db->query($countsql);
	
	if($countResult->fetchColumn() > 0){
	
		$result = $db->query($sql);
		
		echo "<thead><tr><td>Recipient</td><td>Candidate</td><td>Total</td></tr><thead><tbody>";
		
        $itemizedArray = array();

        foreach($result as $row){
            $standardName = $row['standardName'];
            $recipientName = $row['recipientName'];
            
            if(array_key_exists($recipientName, $itemizedArray) == False){
                $insertArray = array(
                    $standardName => array("1" => array($row['date'], $row['amount'], $row['description']))
                );
                $itemizedArray[$recipientName] = $insertArray;
                
            }
            else{
                if(array_key_exists($standardName, $itemizedArray[$recipientName])){
                    $paymentNumber = count($itemizedArray[$recipientName][$standardName]);
                    $itemizedArray[$recipientName][$standardName][$paymentNumber+1] = array(
                        $row['date'], $row['amount'], $row['description']
                    );
                }
                else{
                    $itemizedArray[$recipientName][$standardName]['1'] = array(
                        $row['date'], $row['amount'], $row['description']
                    );
                }
            }
                #echo "<tr><td>" . $row['standardName'] . "</td><td>" . (string)$row['amount'] . "</td><td><a href='https://www.google.com/search?q=" . $row['recipientName'] . "' target='_blank'>" . $row['recipientName'] . "</a></td><td>" . $row['description'] . "</td><td>" . $row['date'] . "</td></tr>";
        }
        foreach($itemizedArray as $recipient => $candidates){
            
            foreach($candidates as $candidate => $expenditures){
                $total = 0;
                $paymentsString = "<ul class='hidden-element'><li class='header-item'>" . $candidate . " <i class='fas fa-long-arrow-alt-right'></i><br />" . $recipient . "</li>";
                foreach($expenditures as $expenditure){
                    $total = $total + $expenditure[1];
                    $expenditureMarkup = "<li>$" . $expenditure[1] . "<br />" . $expenditure[0] . " | " . $expenditure[2] . "</li>";
                    $paymentsString = $paymentsString . $expenditureMarkup;
                }
                $paymentsString = $paymentsString . "</ul>";
                
                echo "<tr><td>" . $recipient . "</td><td>" . $candidate . "</td><td class='total-cell'>" . "<span class='payments-total'> $" . $total . " <i class='fas fa-angle-down'></i></span>" . $paymentsString . "</td>";
            }
        }
        #echo var_dump($itemizedArray);
		echo "</tbody>";
	}
	else{
		echo "candidates: ";
        print_r($candSelections);       
		echo "\n sql: " . $sql;       
		echo "\n filter option: " . $filterOption;       
		echo "\n month: " . $month;       
        #echo "<h3>No results for those selections.</h3>";
	}
	

?>