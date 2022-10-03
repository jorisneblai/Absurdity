# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### Use middleware to fetch data in React components

``` js
const [ data, setData ] = useState(null);

useEffect(() => {
            const f = async () => {
                const newData = await authHeader(expected path);
                if (!newData) {
                    setData(null)
                } else {
                    setData(newData);
                }
            }
            f();
    }, []);

return (
    <div>{data.title}</div>
)
```

/This is the route for create new Account/
router.post('/sign-up',handlerController(usersController.signup));
/This is the route for the validation of connexion/
router.post('/login',handlerController(usersController.login));

/Connected/
/This is the route for Find user By Id/
router.post('/user',tokenAuth.checkUser,handlerController(usersController.getOneByPk));
/This is the route for verify token for front/
router.post('/checkuser',tokenAuth.checkUser);
/This is the route for update the account of the user/
router.patch('/user',tokenAuth.checkUser,handlerController(usersController.update));
/This is the route for delete the account of the user/
router.delete('/user',tokenAuth.checkUser,handlerController(usersController.delete));

/Admin/
/This is the route for watch all users/
router.post('/users',tokenAuth.checkUser, handlerController(usersController.getAll));

/Not connected/
/This the road get all questions and answers/ 
router.get('/questions', handlerController(questionsController.getAllQuestions));
/This the road get only question/ 
router.get('/question/:questionId',handlerController(questionsController.getQuestionById));
/This the road for get one question with the answers/
router.get('/question/:questionId/answers', handlerController(questionsController.getQuestionByIdAnswers));

/Connected/
/This the road for create one answer in the question/
router.post('/question/:questionId/answer',tokenAuth.checkUser,handlerController(questionsController.getQuestionByIdAndCreateAnswer));

/Admin/
/This the road for update one question/ 
router.patch('/question/:questionId',tokenAuth.checkUser,handlerController(questionsController.updateQuestion));
/This the road for delete one question/ 
router.delete('/question/:questionId',tokenAuth.checkUser,handlerController(questionsController.deleteQuestion));
/This the road for create question/ 
router.post('/questions',tokenAuth.checkUser,handlerController(questionsController.createQuestion));

"token": "\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAsInBzZXVkbyI6Im5pY29sYXNzIiwiZW1haWwiOiJybmljb2xhc0BuaWNvbGFzLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY0NDg1MzE3LCJleHAiOjE2NjQ3NDQ1MTd9.hq_mQa8LZFL_wDISflmfYOnswV8AHufMvB-nrqS6-g4\""