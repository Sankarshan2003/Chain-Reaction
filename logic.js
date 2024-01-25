let gamesState = [];
for (let i = 0; i < 5; i++) {
    let k = [0, 0, 0, 0, 0]
    gamesState.push(k);
}
let aniState = [];
let aevent=0;
/*let isCorner = (xy)=>{
    i=xy[0];
    j=xy[1];
    if(Math.abs(x-y)===4||Math.abs(x-y)===0) //Corner
    return false
    else
    return true
}
let isEdge = (xy)=>{
    i = xy[0];
    j=  xy[1];
    if((i===0&&(j>0&&j<4))||(j===0&&(i>0&&i<4))||(j===4&&(i>0&&i<4))||(i===4&&(j>0&&j<4)))//edges
    return false
    else
    return true
}
let isMiddle = (xy)=>{
    if(isCorner(xy)||isEdge(xy)){
        return false
    }else{
        return true
    }
}
*/
let isStable = (gs, xy) => {
    let x = xy[0];
    let y = xy[1];
    if ((x === 0 && y === 0) || (x === 0 && y === 4) || (x === 4 && y === 0) || (x === 4 && y === 4)) //Corner
    {
        if (gs[x][y] > 1)
            return false
        else
            return true
    } else if ((x === 0 && (y > 0 && y < 4)) || (y === 0 && (x > 0 && x < 4)) || (y === 4 && (x > 0 && x < 4)) || (x === 4 && (y > 0 && y < 4))) { //edges
        if (gs[x][y] > 2)
            return false
        else
            return true
    } else {
        if (gs[x][y] > 3) //Middle row
            return false
        else
            return true
    }

}
let updateGameState = async (xy, gs) => {
    let x = xy[0];
    let y = xy[1];
    let currentLevel = [];
    let nextLevel = [];
    let count=0;
    gs[x][y] += 1;

    currentLevel.push([x, y, 1])
    while (currentLevel.length !== 0) {
        for (i of currentLevel) {
            let X = i[0];
            let Y = i[1];
            if (isStable(gs, i)) {
                i[2] = 0
                // gs[X][Y]+=1
            } else {
                count+=1;
                if (X >= 0 && X < 4) {
                    gs[X + 1][Y] += 1;
                    //if(!isStable(gs,[X+1,Y]))
                    nextLevel.push([X + 1, Y, 1]);
                }
                if (X > 0 && X <= 4) {
                    gs[X - 1][Y] += 1;
                    //if(!isStable(gs,[X-1,Y]))
                    nextLevel.push([X - 1, Y, 1]);
                }
                if (Y >= 0 && Y < 4) {
                    gs[X][Y + 1] += 1;
                    //if(!isStable(gs,[X,Y+1]))
                    nextLevel.push([X, Y + 1, 1])
                }
                if (Y > 0 && Y <= 4) {
                    gs[X][Y - 1] += 1;
                    // if(!isStable(gs,[X,Y-1]))
                    nextLevel.push([X, Y - 1, 1])

                }
                gs[X][Y] = 0;

            }
        }
        //aniState.push(currentLevel)
        await updateScreen(currentLevel,count)
        count=0
        currentLevel = nextLevel;
        nextLevel = [];

    }
}
let cols = document.querySelectorAll('.col')
cols.forEach(i => {
    let anim = document.createElement('div')
    anim.classList.add('animation')
    i.innerHTML = '';
    i.appendChild(anim)
})
let grid = document.querySelectorAll('.animation')
let div1 = document.createElement('div')
let div2 = document.createElement('div')
let div3 = document.createElement('div')
let spin=(col,X,Y)=>{
    let div1;
    let div2;
    let div3;
    console.log(gamesState)
    switch (gamesState[X][Y]) {
        case 1:
            col.innerHTML=''
            div1 = document.createElement('div')
            div1.classList.add('blob1', 'spin')
            col.appendChild(div1)
            break;
        case 2:
            col.innerHTML = '';
            div1 = document.createElement('div')
            div2 = document.createElement('div')
            div1.classList.add('blob1', 'lefth', 'spin')
            div2.classList.add('blob1', 'righth', 'delay2', 'spin')
            col.appendChild(div1)
            col.appendChild(div2)
            // div2.classList.add('blob1','righth', 'delay2')
            break;
        case 3:
            col.innerHTML = ''
            div1 = document.createElement('div')
            div2 = document.createElement('div')
            div3 = document.createElement('div')
            // div1.classList.remove('lefth');
            div1.classList.add('blob1', 'leftf', 'delay31', 'spin')
            // div2.classList.remove('righth')
            div2.classList.add('blob1', 'delay32', 'spin')
            div3.classList.add('blob1', 'rightf', 'spin')
            col.appendChild(div1)
            col.appendChild(div2)
            col.appendChild(div3)

            break;
    }
}
let split = (col,X,Y,resolve,count)=>{
    let d1;
    let d2;
    let d3;
    let d4;
    col.innerHTML=''
    let k=1;
    if ((X === 0 && Y === 0) || (X === 0 && Y === 4) || (X === 4 && Y === 0) || (X === 4 && Y === 4)) {
        d1 = document.createElement('div')
        d2 = document.createElement('div')
        d1.addEventListener('animationend',()=>{
            if(count.c===1){
                col.innerHTML=''
                resolve('Split Animation done')
            }
            else{
                count.c-=1
            col.innerHTML=''
            //k++
            }
        })
        if ((X === 0 && Y === 0)) {

            d1.classList.add('blob1', 'lefth', 'splitr')
            d2.classList.add('blob1', 'righth', 'splitd')
        }
        if (X === 0 && Y === 4) {
            
            d1.classList.add('blob1', 'lefth', 'splitl')
            d2.classList.add('blob1', 'righth', 'splitd')

        }
        if (X === 4 && Y === 0) {

            d1.classList.add('blob1', 'lefth', 'splitr')
            d2.classList.add('blob1', 'righth', 'splitu')

        }
        if (X === 4 && Y === 4) {

            d1.classList.add('blob1', 'lefth', 'splitl')
            d2.classList.add('blob1', 'righth', 'splitu')

        }
        
        col.appendChild(d1)
        col.appendChild(d2)
       

    } else if ((X === 0 && (Y > 0 && Y < 4)) || (Y === 0 && (X > 0 && X < 4)) || (Y === 4 && (X > 0 && X < 4)) || (X === 4 && (Y > 0 && Y < 4))) {
         d1 = document.createElement('div')
         d2 = document.createElement('div')
         d3= document.createElement('div')
         d1.addEventListener('animationend',()=>{
            if(count.c===1){
                col.innerHTML=''
                resolve('Split Animation done')
            }
            else{
            count.c-=1
            col.innerHTML=''
           // k++
            }
        })
        if (Y === 0 || Y === 4) {
            d1.classList.add('blob1', 'leftf', 'splitd')
            d2.classList.add('blob1', 'splitu')
            if (Y === 0) {
                d3.classList.add('blob1', 'rightf', 'splitr')
            } else {
                d3.classList.add('blob1', 'rightf', 'splitl')
            }
        } else {
            d1.classList.add('blob1', 'leftf', 'splitr')
            d2.classList.add('blob1', 'splitl')
            if (X === 0) {
                d3.classList.add('blob1', 'rightf', 'splitd')
            } else {
                d3.classList.add('blob1', 'rightf', 'splitu')
            }
        }
        col.appendChild(d1)
        col.appendChild(d2)
        col.appendChild(d3)

    } else {
        d1 = document.createElement('div')
        d2 = document.createElement('div')
        d3= document.createElement('div')
        d4 = document.createElement('div')
        d1.addEventListener('animationend',()=>{
            if(count.c===1){
                col.innerHTML=''
                resolve ('Split Animation done')
            }
            else{
            count.c-=1
            col.innerHTML=''
           // k++
            }
        })
        d1.classList.add('blob1', 'left2d', 'splitu')
        d2.classList.add('blob1', 'lefth', 'splitd')
        d3.classList.add('blob1', 'righth', 'splitl')
        d4.classList.add('blob1', 'right2d', 'splitr')
        col.appendChild(d1)
        col.appendChild(d2)
        col.appendChild(d3)
        col.appendChild(d4) 
    }


}
function updateScreen(cl,count)  {
    return new Promise((resolve)=>{
        let j=0;
        let k=0;
        let spincount = cl.length-count;
        let splitcount={}
         splitcount.c=count;
        for(i of cl){
            console.log(i)
            let X = i[0];
            let Y = i[1];
            let col = document.getElementById(`${i[0]} ${i[1]}`)
            
            if (i[2] == 0) {
                spin(col,X,Y)
                spincount-=1
                if(spincount===0&&splitcount.c===0){
                    resolve('Spin Animation ended')
                }
            } else {
                split(col,X,Y,resolve,splitcount)
                //splitcount-=1
                console.log('Split animation ended')
            }
        }
    })
}
function Clicked(e) {
    console.log(e['id'])
    let xy = [];
    let a = e['id'].split(' ')
    xy.push(parseInt(a[0]))
    xy.push(parseInt(a[1]))
    updateGameState(xy, gamesState)
    //updateScreen()
}
let j = 0;
let k = 0;
grid.forEach(i => {
    i.innerText = '';

    i.setAttribute('id', `${k} ${j}`)
    if (j === 4) {
        k++;
        j = 0;
    }
    else {
        j++;
    }
})
grid.forEach(i => {

    i.addEventListener('click', function () {
        Clicked(this)
    })

})
//setInterval(updateScreen,1500)