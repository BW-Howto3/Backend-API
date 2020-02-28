Schema:

React 1 people:
List of current howtos
POST to API, and localstorage token (ask react 2 or BE guy if you need info)
Stretch: Link by clicking on howto, and displaying a list of steps
React 2 person:
CRUD howtos
Stretch: CRUD steps attached to howtos

API Location: unknown at this time

Auth:
`POST: /api/auth/login`
localstorage.setItem(‘token’ res.body.token)
localstorage.setItem(‘user_id’ res.body.user_id)
`POST: /api/auth/register`

Howto:
`GET /api/howto unauthenticated`
`POST /api/howto authenticated`

```
headers: {
            	authorization: localStorage.getItem('token')
		user_id: localStorage.getItem(‘user_id’)
        	}
```

```
body: {
		name: “How to swap your automatic transmission for a manual”
description: “This is a large body of text that is a description of what this thing is about”
	}
```

`PUT /api/howto/:id authenticated`

```
headers: {
            	authorization: localStorage.getItem('token')
        	}
```

```
body: {
		name: “How to swap your automatic transmission for a manual”
description: “This is a large body of text that is a description of what this thing is about, but this time edited”
	}
```

`DELETE /api/howto/:id authenticated`

```
headers: {
            	authorization: localStorage.getItem('token')
        	}
```

Steps:
`GET: /api/howto/:id/steps unauthenticated`
`POST: /api/howto/:id authenticated`

```
headers: {
            	authorization: localStorage.getItem('token')
        	}
```

    ```
    body: {
    	step_number: “1”
    	name: “remove automatic transmission”

description: “seriously it’s another large body of text that shows more detailed description of what the howto does”
}
```
`PUT: /api/howto/steps/:id authenticated`

```
headers: {
            	authorization: localStorage.getItem('token')
        	}
```

    ```
    body: {
    	step_number: “1”
    	name: “remove automatic transmission”

description: “seriously it’s another large body of text that shows more detailed description of what the howto does, but this time edited”
}
```
`DELETE: /api/howto/steps/:id authenticated`

````
headers: {
            	authorization: localStorage.getItem('token')
        	}
					```
````
