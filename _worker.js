addEventListener('fetch', event => {
  event.respondWith(fetchAndExtractContent(event.request));
});

async function fetchAndExtractContent(request) {
  const response = await fetch('https://www.cloudflare-cn.com/ips-v4/');
  const text = await response.text();

  // 由于 Cloudflare Pages 的限制，不再进行本地文件写入

  const outputUrl = `${request.url.split('?')[0]}/ip.txt`;  // 生成新的地址
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain', 'Location': outputUrl },
  });
}
