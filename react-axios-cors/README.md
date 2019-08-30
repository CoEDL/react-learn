# Toy app to show how to get data from an API

API calls are typically blocked by browsers if they cross domains, eg host1.com requests data from host2.com.

To get around this in development, install Google Chrome plugin, search for this:
`chrome allow-control-allow-origin`

For production, the API host will need to set headers to allow the request.. that's a whole 'nother story.