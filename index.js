// Global Declarations
const element = {
    ms : document.querySelector(".ms span"),
    sec : document.querySelector(".sec span"),
    min : document.querySelector(".min span"),
    hour : document.querySelector(".hour span"),
    start_btn : document.querySelector(".start-btn"),
    reset_btn : document.querySelector(".reset-btn"),
    circle : document.querySelectorAll(".circle")
}

const count = {
    ms : 0,
    sec : 0,
    min : 0,
    hour : 0
}

var timer;

// Add 60 Element To Each Circle
element.circle.forEach(AddSticks);

function AddSticks(elem)
{
    for(var i = 0; i < 60;i++)
    {
        const div = document.createElement("div");
        div.style = "--i:"+i;
        div.className = "sticks";

        elem.appendChild(div); // Append Div Element To Circle
    }
}

// Show Sticks And Count
const ms = new GetDesigned("ms");
const sec = new GetDesigned("sec");
const min = new GetDesigned("min");
const hour = new GetDesigned("hour");

// Count
function msCount()
{
    const perMs = 1000/60;

    count.ms += perMs;

    var converted = Math.ceil(count.ms/16.67);

    if(converted > 59)
    {
        count.ms = 0;
        converted = 0;
        secCount();
    }

    ms.start(converted);

    timer = setTimeout(msCount,perMs);
}

function secCount()
{
    count.sec += 1;
    
    if(count.sec > 59)
    {
        count.sec = 0;
        minCount();
    }

    sec.start(count.sec);
}

function minCount()
{
    count.min += 1;

    if(count.min > 59)
    {
        count.min = 0;
        hourCount();
    }

    min.start(count.min);
}

function hourCount()
{
    count.hour += 1;
    hour.start(count.hour);
}

// To Control Each Circle Sticks, We Need Create An Class
function GetDesigned(elem_name) // Don't Forget To Write First Letter Capital
{
    this.elem_name = elem_name;
    this.sticks = document.querySelectorAll('.'+this.elem_name+" .sticks");

    this.start = function(index)
    {
        var exp = parseInt(index/60);
        exp = index-(exp*60);


        if(exp == 1)
        {
            this.reset();
        }

        // We need to concatenate 0 if length count is 1
        if(String(index).length == 1)
        {
            index = "0"+index;
        }

        document.querySelector("."+elem_name+" span").innerHTML = index;
        this.sticks[exp].style.opacity = 1;
    }

    this.reset = function()
    {
        this.sticks.forEach(function(elem) {
            elem.style.opacity = 0;
        })
    }
}

element.start_btn.addEventListener("click",function() {
    if(this.innerHTML.match(/start/i))
    {
        this.innerHTML = "STOP";
        this.classList.add("stop-btn");
        element.reset_btn.classList.remove("d-none");
        msCount();
    }

    else
    {
        stopCount();
    }
});

function stopCount()
{
    element.start_btn.innerHTML = "START";
    element.start_btn.classList.remove("stop-btn");
    clearTimeout(timer);
}

element.reset_btn.onclick = function()
{
    this.classList.add("d-none");
    stopCount();
    resetCount();
}

function resetCount()
{
    // Reset To Default Value
    count.ms = 0;
    count.sec = 0;
    count.min = 0;
    count.hour = 0;

    // Change Visible Count To 0
    element.ms.innerHTML = "00";
    element.sec.innerHTML = "00";
    element.min.innerHTML = "00";
    element.hour.innerHTML = "00";

    // Reset Sticks To Default
    hour.reset();
    min.reset();
    sec.reset();
    ms.reset();
}

// Code Completed