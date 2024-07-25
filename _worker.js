addEventListener('fetch', event => {
  event.respondWith(fetchAndExtractContent(event.request));
});

async function fetchAndExtractContent(request) {
  const response = await fetch('https://www.cloudflare-cn.com/ips-v4/');
  const text = await response.text();

  // 使用创建可写流的方式写入文件
  const writeStream = fs.createWriteStream('ipv4.txt');
  writeStream.write(text);
  writeStream.end();

  const outputUrl = `${request.url.split('?')[0]}/ip.txt`;  // 生成新的地址
  return new Response(text, {
    headers: { 'Content-Type': 'text/plain', 'Location': outputUrl },
  });
}
