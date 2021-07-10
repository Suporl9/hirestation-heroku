//implementing the search feature class  //search //filter //pagination

class APIFeatures {
  constructor(query, queryString) {
    //creating new obj instance
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword //if the keyword was passed  run first one or else run second where we change nothing and sendit to query
      ? {
          title: {
            $regex: this.queryString.keyword, //for checking in database eith regex pattern //regex is a sequence of characters that forms a search pattern
            //when you are searching for data in a database using text you can use this search pattern
            //allows us to check series of characters for matches //might warn us with its not valid...
            $options: "i", //for case insenstaive can be eiher uppercase or lowsercase
          },
        }
      : {};

    // console.log(keyword);
    // console.log(this.queryString);

    this.query = this.query.find({ ...keyword }); //since there are more properties in keyword obj using spread opertor doesnot mutate  //or we can use it like this .find(keyword)

    return this; //refers to the obj instance on ehich the method is being called..usedn for chaining without returning this we cannot chain wih its parent class
  }

  filter() {
    const queryCopy = { ...this.queryString };

    // console.log(queryCopy);

    //removing the fields like keywords because there wont be that named field in the mongodatabase

    //we are initializing  and removing them because these three will be on our url and when we are searching for service with the  category they should be opt out

    const removeFields = ["keyword", "limit", "page"]; //manually removing these//if there are these keywords in our req.query we dont eant then because there wont beany name field of these in monodb

    removeFields.forEach((data) => delete queryCopy[data]); //delete  operator removes an property from an object //in querycopy delete everrthing or every data which removeFields array array contains

    // console.log(queryCopy);

    //using advanced filter to search according to the the price range //$gte and $lte

    let queryStr = JSON.stringify(queryCopy);

    // console.log(queryStr);

    //using regex(come backlater on)  !!!!!!!!!!!!!!

    //gt|gte|lt|lte //using the bitwise operator // the result would be the value passed//if gte is true i.e passed then it will be 1 and be accepted value

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`); //replace  replaces text in string//first parameter searches for the string(gteor ...) and replace with the returned value from the next parameter which returns the replacement text// we are replacing gte or lte with $gte or $lte

    // console.log(queryStr);

    // this.query = this.query.find(queryCopy); //find in the db with the new property in this.query array which will be {category="Web-Programming or something else"}

    this.query = this.query.find(JSON.parse(queryStr));

    // console.log(queryCopy);

    return this;
  }

  pagination(resDataPerPage) {
    //wehave to implement the skip and limit //skip for skipping data according to the page//for page 1 skip 0(front)//for page 2 skip 6 service data
    const currentPage = Number(this.queryString.page) || 1; //anything passed in page= ,its going to convert in to Number
    const skip = resDataPerPage * (currentPage - 1);

    this.query = this.query.limit(resDataPerPage).skip(skip); //limits with resData = 6 and skips acording to the page if page 2 skips 6 in front
    return this;
  }
}

module.exports = APIFeatures;
