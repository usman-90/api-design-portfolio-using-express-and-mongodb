# api-design-portfolio-using-express-and-mongodb
<h1>Purpose:</h1>
<p>The purpose of this portfolio API is to provide a convenient and efficient way for users to manage and display their portfolio information on their website. With this API, users can easily create, read, update, and delete their basic information such as their name, contact information, and profile picture. Additionally, users can manage information about their skills, certifications, and articles to showcase their professional achievements.
<p/>
<h1>How To Use:</h1>
<h2>Rgistration</h2>
<p><li> Create an accunt by using post method on the following route: <li/>
    "https://portfolio-api-d7k5.onrender.com/signup" <br>
    <li>
    in the body of your request you have to specify username and passoword as: <br>
<li/>
        {
            "username" : "abc@xyz.com",
            "password" : "password123"
    }
</p>
<p>Then you will be given an Auth token which you have to attach to in the authorization of your header of your request object to make further requests.</p>
<h2>Post Methods:</h2>
<table>
    <tr>
        <td>Name</td>
        <td>Description</td>
        <td>Endpoint</td>
        <td>Available fields</td>
    </tr>
    <tr>
        <td>Post User info</td>
        <td>It allows user to save his/her basic information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postUserIfno"</td>
        <td>{
                "name" : "xxx",
                "profession" : "xxx",
                "age" : "xxx",
                "contactNum" : "xxx",
                "country" : "xxx", 
                "city" : "xxx",
                "socialAccs" : "xxx"
                }<td/>
      <tr/>
      <tr>
        <td>Post Certificates</td>
        <td>It allows user to save his/her certificates and achievements information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postCertificate"</td>
        <td>
                {
                "certificateTitle" : "xxx",
                "certificateDate" : "xxx",
                "certificateDescription" : "xxx",
                "certificateOrganization" : "xxx",
                "certificateImageSrc" : "xxx", 
            } 
        </td>
    </tr>
    <tr>
        <td>Post Skills</td>
        <td>It allows user to save his/her skills information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postSkill"</td>
        <td> 
        {
                "skillTitle" : "xxx",
                "skillDescription" : "xxx",
                "skillExperience" : "xxx" // no of years
           }
           </td>
    </tr>
    <tr>
        <td>Post Articles</td>
        <td>It allows user to save his/her Articles information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postArticle"</td>
        <td>
                {
                "articleTitle" : "xxx",
                "articleDate" : "xxx",
                "articleDescription" : "xxx",
                "articleBody" : "xxx",
                "articleImageSrc" : "xxx", 
                "articleCoverImgSrc" : "xxx",
                "articleAuthor" : "xxx"
            }
        </td>
    </tr>
        <tr>
        <td>Save Messages</td>
        <td>It allows user to save messages they recieve on their website</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postMessages"</td>
        <td>
                {
                "messageBody" : "xxx",
                "messageDate" : "xxx",
                "messageSender" : "xxx"
            }
        </td>
    </tr>
      <tr>
        <td>Save Services Information</td>
        <td>It allows user to save his/her Services Information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postServices"</td>
        <td>
                {
                "serviceTitle" : "xxx",
                "serviceDescription" : "xxx",
                "serviceImageSrc" : "xxx"
            }
        </td>
    </tr>
    
      
</table>

<h2>Get Methods:</h2>
<table>
    <tr>
        <td>Name</td>
        <td>Description</td>
        <td>Endpoint</td>
    </tr>
    <tr>
        <td>Fetch User info</td>
        <td>It allows user to fetch his/her basic information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getUserIfno"</td>
      <tr/>
      <tr>
        <td>Fetch All Certificates</td>
        <td>It allows user to fetch all the certificates and achievements information saved</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getAllCertificates"</td>
    </tr>
    <tr>
        <td>Fetch One Certificate</td>
        <td>It allows user to fetch a single certificate by certificate id</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getOnecertificate/:id"</td>   
    </tr>
    <tr>
        <td>Get Skills</td>
        <td>It allows user to fetch his/her all skills information</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getskills"</td>
    </tr>
    <tr>
        <td>Get All Articles</td>
        <td>It allows user to fetch all the saved articles</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getAllArticles"</td>
     </tr>
   <tr>
        <td>Get One Article</td>
        <td>It allows user to fetch a single article by Id</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/postOneArticle/:id"</td>
  </tr>
  <tr>
        <td>Get Messages/td>
        <td>It allows user to fetch All the messages</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getMessages"</td>
  </tr>
  <tr>
        <td>Get Services</td>
        <td>It allows user to fetch his/her all the services</td>
        <td>"https://portfolio-api-d7k5.onrender.com/api/getServices"</td>
  </tr>
    
      
</table>

<h3>To be continued... <h3/>
