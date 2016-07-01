class session{
    constructor() {
        this.type="session";
        this.sessions=0;
        this.sinfo=[["s_info_start"]];
        this.tempda=null;
        return true;
    }
    startd() { 
        if (this.tempda) {
            this.stopd();
        }
        this.sessions+=1;
        this.tempda="true";
        var d = new Date;
        var l= {};
        l["id"]=this.sessions;
        l["st"]=d.getTime();
        (this.sinfo).push(l);
    }
    stopd() {
        this.tempda=null;
        var k=(this.sinfo).length;
        var d = new Date;
        this.sinfo[k-1]["et"]=d.getTime();
    }
    get() {
        var t={};
        t["type"]=this.type;
        t["sessions"]=this.sessions;
        t["s_info"]=this.sinfo;
        return t;
    }
    get_diff(id) {
        var temr = this.sinfo[id];
        return temr["et"]-temr["st"];
    }
    get_diff_sessions(id1,id2) {
        var temr1 = this.sinfo[id1];
        temr1=temr1["et"];
        var temr2 = this.sinfo[id2];
        temr2=temr2["st"];
        return temr2-temr1;
    }
    no_sessions() {
        return this.sessions;
    }
}
class wsession extends session{
    constructor() {
        this.handle=window.addEventListner("load",function(){
            window.addEventListner("onfocus",function(){
                this.starw();
            })
            window.addEventListner("onblur",function(){
                this.stopw();
            })
        });    
    }
    starw() {
        this.startd();
    }
    stopw() {
        this.stopd();
    }
    active_time(id) {
        return this.get_diff(id);
    }
    out_time(id1,id2){
        return this.get_diff_sessions(id1,id2);
    }
}
