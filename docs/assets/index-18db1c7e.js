(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=a(s);fetch(s.href,r)}})();const L=`<div class="modal-dialog">
  <form novalidate>
    <span>User</span>
    <input type="text" name="firstName" placeholder="First Name" />
    <input type="text" name="lastName" placeholder="Last Name" />
    <input type="number" name="balance" placeholder="Balance" />

    <div>
      <input type="checkbox" id="is-active" name="isActive" checked />
      <label for="is-active">is active?</label>
    </div>

    <button type="submit">Save</button>
  </form>
</div>
`;class b{constructor({id:t,isActive:a,balance:n,avatar:s,firstName:r,lastName:c,gender:m}){this.id=t,this.isActive=a,this.balance=n,this.avatar=s,this.firstName=r,this.lastName=c,this.gender=m}}const h=e=>{const{avatar:t,balance:a,first_name:n,gender:s,id:r,isActive:c,last_name:m}=e;return new b({avatar:t,balance:a,firstName:n,gender:s,id:r,isActive:c,lastName:m})},P=async e=>{const t=`http://localhost:3001/users/${e}`,n=await(await fetch(t)).json();return h(n)};let i,d,p={};const v=async e=>{if(i==null||i.classList.remove("hide-modal"),p={},!e)return;const t=await P(e);N(t)},y=()=>{i==null||i.classList.add("hide-modal"),d==null||d.reset()},N=e=>{d.querySelector('[name="firstName"]').value=e.firstName,d.querySelector('[name="lastName"]').value=e.lastName,d.querySelector('[name="balance"]').value=e.balance,d.querySelector('[name="isActive"]').checked=e.isActive,p=e},T=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=L,i.classList.add("modal-container","hide-modal"),d=i.querySelector("form"),e.append(i),i.addEventListener("click",a=>{a.target.classList.contains("modal-container")&&y()}),d.addEventListener("submit",async a=>{a.preventDefault();const n=new FormData(d);n.get("isActive")||n.append("isActive","off");const s={...p};for(const[r,c]of n){if(r==="balance"){s[r]=+c;continue}if(r==="isActive"){s[r]=c==="on";continue}s[r]=c}await t(s),y()}))};const E=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{v()})},g=async(e=1)=>{const t=`http://localhost:3001/users?_page=${e}`;return(await(await fetch(t)).json()).map(h)},o={users:[],currentPage:0},$=async()=>{const e=await g(o.currentPage+1);e.length!==0&&(o.currentPage++,o.users=e)},w=async()=>{if(o.currentPage===1)return;const e=await g(o.currentPage-1);o.currentPage--,o.users=e},A=e=>{let t=!1;o.users=o.users.map(a=>a.id===e.id?(t=!0,e):a),o.users.length<10&&!t&&o.users.push(e)},U=async()=>{const e=await g(o.currentPage);if(e.length===0){await w();return}o.users=e},l={loadNextPage:$,loadPreviousPage:w,onUserChanged:A,reloadPage:U,getUsers:()=>[...o.users],getCurrentPage:()=>o.currentPage},S=async e=>{const t=`http://localhost:3001/users/${e}`,n=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:n}),!0};let u;const x=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>firstName</th>
      <th>lastName</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>
  `;const a=document.createElement("tbody");return e.append(t,a),e},B=e=>{const t=e.target.closest(".select-user");if(!t)return;const a=t.getAttribute("data-id");v(a)},M=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const a=t.getAttribute("data-id");try{await S(a),await l.reloadPage(),document.querySelector("#current-page").innerText=l.getCurrentPage(),f()}catch(n){console.log(n),alert("Could not be deleted")}},f=e=>{const t=l.getUsers();u||(u=x(),e.append(u),u.addEventListener("click",B),u.addEventListener("click",M));let a="";t.forEach(n=>{a+=`
      <tr>
        <td>${n.id}</td>
        <td>${n.balance}</td>
        <td>${n.firstName}</td>
        <td>${n.lastName}</td>
        <td>${n.isActive}</td>
        <td>
          <a href="#/" class="select-user" data-id="${n.id}">Select</a>
          |
          <a href="#/" class="delete-user" data-id="${n.id}">Delete</a>
        </td>
      </tr>
    `,u.querySelector("tbody").innerHTML=a})};const C=e=>{const t=document.createElement("button");t.innerText=" Next >";const a=document.createElement("button");a.innerText="< Pext ";const n=document.createElement("span");n.id="current-page",n.innerText=l.getCurrentPage(),e.append(a,n,t),t.addEventListener("click",async()=>{await l.loadNextPage(),n.innerText=l.getCurrentPage(),f(e)}),a.addEventListener("click",async()=>{await l.loadPreviousPage(),n.innerText=l.getCurrentPage(),f(e)})},q=e=>{const{avatar:t,balance:a,firstName:n,gender:s,id:r,isActive:c,lastName:m}=e;return{avatar:t,balance:a,first_name:n,gender:s,id:r,isActive:c,last_name:m}},H=async e=>await(await fetch("http://localhost:3001/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json(),O=async e=>{const t=`http://localhost:3001/users/${e.id}`;return await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()},j=async e=>{const t=new b(e);if(!t.firstName||!t.lastName)throw new Error("First & Lastname are required");const a=q(t);let n;return t.id?n=await O(a):n=await H(a),h(n)},D=async e=>{e.innerHTML="Loading...",await l.loadNextPage(),e.innerHTML="",f(e),C(e),E(e),T(e,async t=>{const a=await j(t);l.onUserChanged(a),f()})};D(document.querySelector("#app"));
