addEventListener('fetch', event => {
  event.respondWith(fetchAndExtractContent(event.request));
});

async function fetchAndExtractContent(request) {
  const response = await fetch('https://www.cloudflare-cn.com/ips-v4/');
  const text = await response.text();

  // 由于 Cloudflare Pages 环境的限制，无法直接保存文件到本地
  // 这里可以考虑将获取到的内容以其他方式处理，比如返回给客户端或存储到其他云存储服务

  const outputUrl = `${request.url.split('?')[0]}/ip.txt`;  // 生成新的地址
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain', 'Location': outputUrl },
  });
}
