addEventListener('fetch', event => {
  event.respondWith(fetchAndExtractContent(event.request));
});

async function fetchAndExtractContent(request) {
  const response = await fetch('https://www.cloudflare-cn.com/ips-v4/');
  const text = await response.text();

  // 使用 Deno 的标准库来写入文件
  if (Deno?.writeTextFileSync) {
    Deno.writeTextFileSync('ipv4.txt', text);
  }

  const outputUrl = `${request.url.split('?')[0]}/ip.txt`;  // 生成新的地址
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain', 'Location': outputUrl },
  });
}
