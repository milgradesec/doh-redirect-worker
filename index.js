addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Redirect request to other DoH endpoint
 * @param {Request} request 
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url

  if (pathname == "/") {
    console.log("Redirecting to Github Pages")
    return Response.redirect("https://milgradesec.github.io/paesadns/", 301)
  }

  const newURL = "https://cloudflare-dns.com" + pathname + search
  console.log("New URL ==> " + newURL)

  const newRequest = new Request(newURL, {
    body: request.body,
    headers: request.headers,
    method: request.method,
    redirect: request.redirect
  })

  const response = await fetch(newRequest)
  return response
}