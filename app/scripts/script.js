console.clear()
// let countDownDate = parseInt($('.displayTime').html())
// let counter = 0
let timeLeft = 0
let startTime = 0
let currentTime = 0
let isPaused = false

let convertSeconds = s =>{
  let min = floor(s / 60)
  let sec = s % 60
  return nf(min,2)+':'+nf(sec,2)
}
$('.btn--change').on('click',function(){
    $(this).append($('span:first-child'))
    $(this).children().toggle()
  })

function setup(){
  noCanvas()
  
  let timer = () => {
    $('.displayTime').html(convertSeconds(timeLeft - currentTime))
  }
  
  $('.add').click(function(){
    let a = $('span:first-child').text()
    if( a == 'min' && timeLeft <= 3600){
      timeLeft += 60
      return timer()
    }else if(a == 'sec'){
      timeLeft ++
      return timer()
    }
  })

  $('.reduce').click(function(){
    let a = $('span:first-child').text()
    if( a == 'min' && 60 <= timeLeft){
      timeLeft -= 60
      return timer()
    }else if(a == 'sec' && timeLeft > 0){
      timeLeft --
      return timer()
    }
  })
  
  $('.btn--refresh').on('click',function(){
    if(timeLeft > 0){
      timeLeft = 0
      return timer()
    }
  })
  
  $('.btn--start').on('click',function(){
    startTime = millis()
    let interval = setInterval(function(){
      if(!isPaused){
        timeIt()
      }
    },1000)
    if(timeLeft == 0){
      clearInterval(interval)
    }else{
      $('.btn--change').css('pointer-events','none')
      $('.add').css('pointer-events','none')
      $('.reduce').css('pointer-events','none')
      $('.btn--refresh').children().html('stop')
      $(this).children().html('pause')
      $(this).addClass('btn--pause')
    }
    $('.btn--pause').on('click',function(){
      isPaused = !isPaused
      if(isPaused){
        currentTime += floor((millis() - startTime) / 1000)
        $('.btn--start').children().html('play_arrow') 
      }else{
        $('.btn--start').children().html('pause')
      }
      
    })
    function timeIt(){
      currentTime = floor((millis() - startTime) / 1000)
      timer()
      if(timeLeft == currentTime){
        clearInterval(interval)
        currentTime = 0
        $('.btn--start').children().html('play_arrow')
        $('.btn--start').removeClass('btn--pause')
        $('.btn--refresh').children().html('refresh')
        $('.btn--change').css('pointer-events','auto')
        $('.add').css('pointer-events','auto')
        $('.reduce').css('pointer-events','auto')
      }
    }  
  })
  
}