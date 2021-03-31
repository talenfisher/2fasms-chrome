
function onCodeReceived(event)
{
    if (document.activeElement.tagName.toLowerCase() !== 'input')
    {
        return;
    }
    
    document.activeElement.setAttribute("value", event.code);
    document.activeElement.dispatchEvent(new Event("change", { bubbles: true }));
    
    const form = document.activeElement.form;
    form.requestSubmit();
}

const ws = new WebSocket("ws://localhost:8736");
ws.onmessage = (event) => 
{
    const payload = JSON.parse(event.data);
    switch (payload.type)
    {
        case "code": onCodeReceived(payload); break;
        default: break;
    }
};
