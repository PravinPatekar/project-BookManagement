
let rating = 

let ratingregex = /[1-5]{1}/
       if (!(ratingregex.test(rating))) {
           console.log("error")
    }else{
        console.log("done")
    }


// if(typeof(rating)!=="number" && (rating <= 1 || rating >= 5)){
//     console.log("error")
// }else{
//     console.log("done")
// }