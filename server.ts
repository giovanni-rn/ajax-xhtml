import { readFile } from "node:fs/promises";
import { IncomingMessage, ServerResponse, createServer } from "node:http"
import { parse } from "node:url";
const port = 8000
type Req = IncomingMessage
type Res = ServerResponse<IncomingMessage>

const http = createServer((req, res) => {
    // Get file name from URL
    const parsedUrl = parse(req.url!, true)
    const fileName = parsedUrl.query.file
    console.log(req.url, fileName);
    // Single multi-purposes GET Controllers
    getFile(req, res, fileName as string)
})

const getFile = async (req: Req, res: Res, file: string) => {
    try {
        // Get file content as string and content type
        const xhtml = await readFile(__dirname + "/" + file)
        const type = `application/${file.includes("xhtml") ? "xhtml+" : ""}xml`
        // Send response
        res.writeHead(200, { "content-length": Buffer.byteLength(xhtml), "content-type": type })
        res.end(xhtml)
    } catch (error) {
        res.writeHead(404)
        res.end("No such file : " + file)
    }
}

http.listen(port, () => console.log("Port", port))