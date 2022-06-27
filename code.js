//pay button in my website calls this method
//this method is working
	function getData1() {
		let cardNum = textRef.current.value
		let cvv = numberRef.current.value
		let expiryMonth = dateRef.current.value.split("/")[0]
		let expiryYear = dateRef.current.value.split("/")[1]
    //I have added https://cors-anywhere.herokuapp.com/ to the starting of the URL to avoid CORS error
		let url = "https://cors-anywhere.herokuapp.com/https://api.na.bambora.com/scripts/tokenization/tokens"
		let data = {
			number: cardNum,
			expiry_month: expiryMonth,
			expiry_year: expiryYear,
			cvv: cvv,
		}
    
		let params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "true"
			},
			body: JSON.stringify(data)
		}
		
		fetch(url, params).then(response => response.json()).then(data => {
			getData2(data.token)
		})
	}

//the function which is returning Passcode authentication failure
function getData2(token) {
		let tokenObject = {
			name: "Aditya Dixit",
			code: token
		}
		let params = {
			method: "POST",
			headers: {
				"Authorization": constants.PAYMENT_PASSCODE,//this is the passcode, which I got from this website: https://dev.na.bambora.com/docs/forms/encode_api_passcode/
				"Content-Type": "application/json",
			},
			body: JSON.stringify(tokenObject)
		}
		let uri = "https://cors-anywhere.herokuapp.com/https://api.na.bambora.com/v1/profiles"
		fetch(uri, params).then(response => response.json()).then(data => console.log(data)//this is where I am getting Passcode authentication failure)
	}
