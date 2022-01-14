addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url

  if (pathname == "/") {
    return Response.redirect("https://milgradesec.github.io/paesadns/", 301)
  }

  console.log(request.method)
  if (!(request.method === "GET") || !(request.method === "POST")) {
    return new Response("Method Not Allowed", { status: 405 })
  }

  const newURL = `https://${DOH_ADDRESS}${pathname}${search}`
  const newRequest = new Request(newURL, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect
  })

  return await fetch(newRequest)
}
