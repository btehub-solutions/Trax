async function run() {
  try {
    const res = await fetch('http://localhost:4000/uploads/1781105400233-410504180.jpeg');
    console.log('Status:', res.status);
    console.log('Headers:', res.headers);
    const buffer = await res.arrayBuffer();
    console.log('Data length:', buffer.byteLength);
  } catch (err: any) {
    console.error('Error fetching image:', err.message);
  }
}

run();

