(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();const L=`<div class="modal-dialog">
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
`;class b{constructor({id:t,isActive:s,balance:n,avatar:a,firstName:r,lastName:o,gender:m}){this.id=t,this.isActive=s,this.balance=n,this.avatar=a,this.firstName=r,this.lastName=o,this.gender=m}}const f=e=>{const{avatar:t,balance:s,first_name:n,gender:a,id:r,isActive:o,last_name:m}=e;return new b({avatar:t,balance:s,firstName:n,gender:a,id:r,isActive:o,lastName:m})},P=async e=>{const t=`https://my-json-server.typicode.com/juan18506/crud-db-app/users/${e}`,n=await(await fetch(t)).json();return f(n)};let i,l,h={};const v=async e=>{if(i==null||i.classList.remove("hide-modal"),h={},!e)return;const t=await P(e);N(t)},g=()=>{i==null||i.classList.add("hide-modal"),l==null||l.reset()},N=e=>{l.querySelector('[name="firstName"]').value=e.firstName,l.querySelector('[name="lastName"]').value=e.lastName,l.querySelector('[name="balance"]').value=e.balance,l.querySelector('[name="isActive"]').checked=e.isActive,h=e},T=(e,t)=>{i||(i=document.createElement("div"),i.innerHTML=L,i.classList.add("modal-container","hide-modal"),l=i.querySelector("form"),e.append(i),i.addEventListener("click",s=>{s.target.classList.contains("modal-container")&&g()}),l.addEventListener("submit",async s=>{s.preventDefault();const n=new FormData(l);n.get("isActive")||n.append("isActive","off");const a={...h};for(const[r,o]of n){if(r==="balance"){a[r]=+o;continue}if(r==="isActive"){a[r]=o==="on";continue}a[r]=o}await t(a),g()}))};const E=e=>{const t=document.createElement("button");t.innerText="+",t.classList.add("fab-button"),e.append(t),t.addEventListener("click",()=>{v()})},y=async(e=1)=>{const t=`https://my-json-server.typicode.com/juan18506/crud-db-app/users?_page=${e}`;return(await(await fetch(t)).json()).map(f)},c={users:[],currentPage:0},$=async()=>{const e=await y(c.currentPage+1);e.length!==0&&(c.currentPage++,c.users=e)},w=async()=>{if(c.currentPage===1)return;const e=await y(c.currentPage-1);c.currentPage--,c.users=e},A=e=>{let t=!1;c.users=c.users.map(s=>s.id===e.id?(t=!0,e):s),c.users.length<10&&!t&&c.users.push(e)},U=async()=>{const e=await y(c.currentPage);if(e.length===0){await w();return}c.users=e},d={loadNextPage:$,loadPreviousPage:w,onUserChanged:A,reloadPage:U,getUsers:()=>[...c.users],getCurrentPage:()=>c.currentPage},j=async e=>{const t=`https://my-json-server.typicode.com/juan18506/crud-db-app/users/${e}`,n=await(await fetch(t,{method:"DELETE"})).json();return console.log({deleteResult:n}),!0};let u;const S=()=>{const e=document.createElement("table"),t=document.createElement("thead");t.innerHTML=`
    <tr>
      <th>#ID</th>
      <th>Balance</th>
      <th>firstName</th>
      <th>lastName</th>
      <th>Active</th>
      <th>Actions</th>
    </tr>
  `;const s=document.createElement("tbody");return e.append(t,s),e},x=e=>{const t=e.target.closest(".select-user");if(!t)return;const s=t.getAttribute("data-id");v(s)},B=async e=>{const t=e.target.closest(".delete-user");if(!t)return;const s=t.getAttribute("data-id");try{await j(s),await d.reloadPage(),document.querySelector("#current-page").innerText=d.getCurrentPage(),p()}catch(n){console.log(n),alert("Could not be deleted")}},p=e=>{const t=d.getUsers();u||(u=S(),e.append(u),u.addEventListener("click",x),u.addEventListener("click",B));let s="";t.forEach(n=>{s+=`
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
    `,u.querySelector("tbody").innerHTML=s})};const M=e=>{const t=document.createElement("button");t.innerText=" Next >";const s=document.createElement("button");s.innerText="< Pext ";const n=document.createElement("span");n.id="current-page",n.innerText=d.getCurrentPage(),e.append(s,n,t),t.addEventListener("click",async()=>{await d.loadNextPage(),n.innerText=d.getCurrentPage(),p(e)}),s.addEventListener("click",async()=>{await d.loadPreviousPage(),n.innerText=d.getCurrentPage(),p(e)})},C=e=>{const{avatar:t,balance:s,firstName:n,gender:a,id:r,isActive:o,lastName:m}=e;return{avatar:t,balance:s,first_name:n,gender:a,id:r,isActive:o,last_name:m}},q=async e=>await(await fetch("https://my-json-server.typicode.com/juan18506/crud-db-app/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json(),H=async e=>{const t=`https://my-json-server.typicode.com/juan18506/crud-db-app/users/${e.id}`;return await(await fetch(t,{method:"PATCH",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).json()},O=async e=>{const t=new b(e);if(!t.firstName||!t.lastName)throw new Error("First & Lastname are required");const s=C(t);let n;return t.id?n=await H(s):n=await q(s),f(n)},D=async e=>{e.innerHTML="Loading...",await d.loadNextPage(),e.innerHTML="",p(e),M(e),E(e),T(e,async t=>{const s=await O(t);d.onUserChanged(s),p()})};D(document.querySelector("#app"));
