// Step 1: Without react-query

export const removeBg = async(image) => {
	const {dataURL} = image;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const response = await fetch('http://localhost:8081', {
		method: 'POST',
	    headers: myHeaders,
    	redirect: 'follow',
    	// mode: 'same-origin', // no-cors, *cors, same-origin
    	// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    	// credentials: 'same-origin', // include, *same-origin, omit

    	body: JSON.stringify({data: dataURL})
	})
	.then(res => res.json())

	console.log("GOt response");

	return await response?.data ?? {};
}