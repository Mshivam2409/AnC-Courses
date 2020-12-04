<template>
  <div class="body">
    <div v-if="error.statusCode === 500">
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <div class="col-sm-10 col-sm-offset-1 text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center">500</h1>
                </div>
                <div class="contant_box_404">
                  <h3 class="h2">Look like we're down or</h3>
                  <p>something's fishy in our servers!</p>
                  <el-button><a href="" />Go Home</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="error.statusCode === 404" class="body">
      <div id="particles-js"></div>
      <div class="terminal-window">
        <header>
          <div class="button green"></div>
          <div class="button yellow"></div>
          <div class="button red"></div>
        </header>
        <section class="terminal">
          <div class="history"></div>
          $&nbsp;<span class="prompt"></span>
          <span class="typed-cursor"></span>
        </section>
      </div>
      <!-- data -->
      <div class="terminal-data mimik-run-output">
        <br />Found 1 feature<br />
        ----------------------------------------------<br />
        Feature: Bottles <span class="gray"># ./features/bottles.feature</span
        ><br /><br />

        &nbsp;&nbsp;Scenario: A bottle falls from the wall<br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
        <span class="gray">Given 100 green bottles are standing</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
        <span class="gray">when 1 green bottle accidentally falls</span><br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span class="green">✓</span>
        <span class="gray">then there are 99 green bottles standing</span><br />
        <br />
        <span class="gray"
          >&nbsp;---------- ----------- ------- -------- --------</span
        ><br />
        &nbsp;&nbsp;Features&nbsp;&nbsp;&nbsp;Scenarios&nbsp;&nbsp;&nbsp;Steps&nbsp;&nbsp;&nbsp;Passed&nbsp;&nbsp;&nbsp;Failed<br />
        <span class="gray"
          >&nbsp;---------- ----------- ------- -------- --------</span
        ><br />
        &nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
          class="green"
          >✓ 4</span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 <br />
        <br />
        &nbsp;&nbsp;Completed 1 feature in 0.01s<br />
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: ['error'],
  mounted() {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'js/500.js'
    document.body.appendChild(script)
  },
})
</script>

<style scoped>
/*======================
    404 page
=======================*/
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: visible;
}
.row {
  width: 100%;
  text-align: center;
}
.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  overflow: visible;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}
.contant_box_404 {
  margin-top: -50px;
}
* {
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.centered {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  margin-bottom: 50px;
  font-family: 'Lato', sans-serif;
  font-size: 50px;
}

.message {
  display: inline-block;
  line-height: 1.2;
  transition: line-height 0.2s, width 0.2s;
  overflow: hidden;
}

.message,
.hidden {
  font-family: 'Roboto Slab', serif;
  font-size: 18px;
}

.hidden {
  color: #fff;
}

/*======================
    500 page
=======================*/
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}

.body {
  background: #97cfca;
  /* overflow: visible; */
  width: 100%;
  height: 100vh;
}

.terminal-window {
  text-align: left;
  width: 37.5rem;
  height: 22.5rem;
  border-radius: 0.625rem;
  margin: auto;
  position: relative;
  top: 15.5rem;
}

.terminal-window header {
  background: #e0e8f0;
  height: 1.875rem;
  border-radius: 0.5rem 0.5rem 0 0;
  padding-left: 0.625rem;
}

.terminal-window header .button {
  width: 0.75rem;
  height: 0.75rem;
  margin: 0.625rem 0.25rem 0 0;
  display: inline-block;
  border-radius: 0.5rem;
}

.terminal-window header .button.green {
  background: #3bb662;
}

.terminal-window header .button.yellow {
  background: #e5c30f;
}

.terminal-window header .button.red {
  background: #e75448;
}

.terminal-window section.terminal {
  color: white;
  font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
  font-size: 11pt;
  background: #30353a;
  padding: 0.625rem;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  top: 1.875rem;
  bottom: 0;
  overflow: auto;
}

.terminal-window section.terminal .typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.terminal-data {
  display: none;
}
.terminal-window .gray {
  color: gray;
}
.terminal-window .green {
  color: green;
}

/*Media for mobile responsive viewing*/
@media only screen and (max-width: 600px) {
  .terminal-window {
    text-align: left;
    width: 37.5vmin;
    height: 22.5vmin;
    border-radius: 0.625vmin;
    margin: auto;
    position: relative;
    top: 30.5vmin;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window header {
    background: #e0e8f0;
    height: 1.875vmin;
    border-radius: 0.5vmin 0.5vmin 0 0;
    padding-left: 1vmin;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window header .button {
    width: 0.75vmin;
    height: 0.75vmin;
    margin: 0.625vmin 0.25vmin 0 0;
    display: inline-block;
    border-radius: 0.5vmin;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window header .button.green {
    background: #3bb662;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window header .button.yellow {
    background: #e5c30f;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window header .button.red {
    background: #e75448;
  }
}
@media only screen and (max-width: 600px) {
  .terminal-window section.terminal {
    color: white;
    font-family: Menlo, Monaco, 'Consolas', 'Courier New', 'Courier';
    font-size: 0.6875vmin;
    background: #30353a;
    padding: 0.625vmin;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    top: 1.875vmin;
    bottom: 0;
    overflow: auto;
  }
}
.terminal-window section.terminal .typed-cursor {
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.terminal-data {
  display: none;
}
.terminal-window .gray {
  color: gray;
}
.terminal-window .green {
  color: green;
}
</style>