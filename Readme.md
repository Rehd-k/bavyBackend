*Features
    |-Serach
    |-Filter
    |-Social share 
    |-Infinit Scroll
    |-Review
    |-Checking out 
    |-Shopping cart 
    |-Admin dash borad 
    |-Image/gif upload 
    |- mailer 
    |- User auth 
        |-local 
        |-facebook
        |-google
    |-live chat 
    //Other features would still be added 
==============================================================
*ToDO 
        <!-- |-Seperation of conserns 
        |-Routing 
        |-Database 
        |-User Auth
            |-local -->
            |-facebook 
            |-google
        |-Geo location
        <!-- |-Serach
        |-Filter -->
        |-Social share 
        |-Infinit Scroll
        <!-- |-Review -->
        |-Checking out 
        |-Shopping cart 
        |-Admin dash borad 
        |-Image/gif upload 
        |- mailer 
        |-live chat 
        |- sob domin
==============================================================
*Routes
    User
        My bold account
            |-Orders 
            |-Pending Reviews
            |-Saved Iterms
            |-Recenlty viewed
        Accounts settings
            |-Details
            |-Address Book
            |-Change Password
            |-Newsletter
    Our Categories
        Fashion
            Men's fashion
                |-watches 
                |-clothing 
                |-Shoes
                |-'Mens' Accessories
                |-Jewelry
            Women's fashion 
                |-Clothing 
                |-Shoes
                |-womens watches
                |-Jewelry
                |-handbags and wallets
                |-Womens accessories
        Beauty
            Hair Care
                |-Extensions, wigs and Accessories
                |-Hair and Scalp Care 
                |-Hair Accessories 
                |-Hair loss porducts 
            Fragrances 
                |-Women's 
                |-Men's 
                |-Unisex 
        Raw materials 
            fabrics
            leather
    <!-- Sell Bolder(Go bold) -->
    Help Center 
    Contact Us
      //these other empty routes are still going to be filled up with more sub routes
==============================================================
*DataBase 
    Users General
        |- First Name - String 
        |- Last Name - String 
        |- Gender - String
        |- DoB - Date
        |- phone number - Number 
        |- Profile picture - String 
        |- Address - String  
        |- Newsletter - String 
        |- Orders - [{'array_of_Objects'}]
        |- Reviews- [{'array_of_Objects}]
        |- Saved Iterms - [{'array_of_Objects}]
    Users sellers
        |-first and last name
        |-phone number
        |-display name/ shop name
        |-email address
        |-password
        |-Company logo - String 
        |-terms and conditions
    Porducts
        |- Product title - String 
        |- Product image - Array of string
        |- Description -String
        |- Review - [{'array_of_objects}]
        |- Price - String 
        |- Size -String 
        |- Color - String
        |- Desingers - String
        |- Main category
        |- sub category
        |- weight - String
        |- main material -String
        |- Size chart - String
        |- author - ObjectId
        |- Shop/company name - String
        |- customer care 
==============================================================


the regitser contollers would still have many more validationm added 
email reges, any filed empty , password less than 6, ...
still have to write the oders model route and all 
change the place of the title and thw for ...everything 
remember to ask amara about the types of material there are

1) only delivered orders can be reviewed and commented on
<!-- 2) fix profile page  -->
3) fix edit profile and uploads page
4) fix clicking an iterm from the index page and other pages thats not the file itself
5) remove the sellers whole pages to the different sub document 
6) add to the sellers account the about page and the news pages 
<!-- 8) go back and the the getsellerIterms route after i have populateed the collections with the nessary populations -->
<!-- 8) check if the finding by the producers would work with req.body instead of req.params -->
9) updating images images 
<!-- 10) install lodash and do profile page -->
10) add to the front end that when a title is selected the category and the for sesctions would automatically be selected
11) google most demanded beautly products in nigeria ....also fashion products
12) outof stock ...i donnot yet its either going to be the seller chosses when ever or the count goes down
13) make the categories routes to find random
