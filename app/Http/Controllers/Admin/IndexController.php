<?php

namespace App\Http\Controllers\Admin;

/**
 * version:1.0
 * by:wave
 */

use App\Http\Controllers\Common\CommonController;

use App\Http\Controllers\Common\SystemCotroller;

use App\Http\Controllers\Controller;

use App\Http\Controllers\Core\CoreController;

use Illuminate\Http\Request;

use core\libs\view;



class IndexController extends Controller

{



    private $core;

    private $webset;

    private $system;

    private $common;



    #初始化采集核心

    public function __construct()

    {

        $this->core = new CoreController();

        #初始化设置项

        $this->webset = config('webset');

        #初始化系统参数

        $this->system = new SystemCotroller();

        #初始化公共控制器

        $this->common = new CommonController();



    }



    #生成后台首页

    public function index()

    {

        $total = $this->core->getTotal();
       
        $cxnum = count($this->common->readData('dydata'));

        $used_mem = $this->system->getMem();

        $info = $this->system->getServerInfo();

        return view('admin.index', ['total' => $total[0]['total']+$cxnum,'used_mem'=>$used_mem,'info'=>$info, 'webset' => $this->webset]);

    }



    #生成后台网站设置界面

    public function webSet()

    {

        $webset = config('webset');
        
        $templates = $this->common->getTemDir();
       
        
        return view('admin.adminset', ['webset' => $webset,'templates'=>$templates]);

    }



    #生成后台接口界面

    public function jkSet()

    {

        $jkset = config('jkset');

        return view('admin.jiekou', ['jkset' => $jkset, 'webset' => $this->webset]);

    }
    
    #生成后台收费设置界面

    public function sfSet()
    {

        $sfset = config('sfset');

        return view('admin.sfset', ['sfset' => $sfset, 'webset' => $this->webset]);

    }



    #生成后台尝鲜列表

    public function newMovieList()

    {



        $dylist = $this->common->readData('dydata');

        return view('admin.newmovielist', ['webset' => $this->webset, 'dylist' => array_reverse($dylist)]);

    }



    #增加尝鲜数据

    public function addNewMovie()

    {

        return view('admin.addnewmovie', ['webset' => $this->webset]);

    }



    #电影编辑界面

    public function editMovie($id)

    {



        $dylist = $this->common->readData('dydata');

        $dy = $dylist[$id];

        return view('admin.editmovie', ['webset' => $this->webset, 'dy' => $dy, 'id' => $id]);

    }



    #生成短网址

    public function makeUrl()

    {

         return view('admin.shorturl',['webset' => $this->webset]);

    }

    #生成友情连接添加页

    public function yqLink(){

        return view('admin.addyqlink',['webset'=>$this->webset]);

    }



    #生成后台友情链接列表

    public function yqLinkList()

    {



        $yqlist = $this->common->readData('yqlink');

        return view('admin.yqlinklist', ['webset' => $this->webset, 'yqlist' => array_reverse($yqlist)]);

    }

    #友情编辑界面

    public function editYqLink($id)

    {



        $yqlist = $this->common->readData('yqlink');

        $yq = $yqlist[$id];

        return view('admin.edityq', ['webset' => $this->webset, 'yq' => $yq, 'id' => $id]);

    }



    #生成直播添加页

    public function addZb(){

        return view('admin.addzb',['webset'=>$this->webset]);

    }



    #生成直播列表

    public function zbList()

    {

        $zblist = $this->common->readData('zblist');

        return view('admin.zblist', ['webset' => $this->webset, 'zblist' => array_reverse($zblist)]);

    }



    #直播编辑界面

    public function editZb($id)

    {



        $zblist = $this->common->readData('zblist');

        $zb = $zblist[$id];

        return view('admin.editzb', ['webset' => $this->webset, 'zb' => $zb, 'id' => $id]);

    }



    #对接微信

    public function WeiXin(){

        return view('admin.weixin',['webset' => $this->webset]);

    }



    #控制缓存

    public function flushCache(){

        return view('admin.cache',['webset' => $this->webset]);

    }



    #设置广告

    public function setAd(){

        return view('admin.setad',['webset' => $this->webset]);

    }

    #设置APP信息

    public function appInfo(){

        return view('admin.appinfo',['webset' => $this->webset]);

    }



    #生成添加侵权页面

    public function addQq(){

        return view('admin.addqq',['webset' => $this->webset]);

    }

    #生成侵权列表

    public function qqList()

    {

        $qqlist = $this->common->readData('qqlist');

        return view('admin.qqlist', ['webset' => $this->webset, 'qqlist' => array_reverse($qqlist)]);

    }

    #生成编辑侵权界面

    public function editQq($id)

    {

        $qqlist = $this->common->readData('qqlist');

        $qq = $qqlist[$id];

        return view('admin.editqq', ['webset' => $this->webset, 'qq' => $qq, 'id' => $id]);

    }



    #生成添加轮播页面

    public function addBanner(){

        return view('admin.addbanner',['webset' => $this->webset]);

    }

    #生成轮播列表

    public function bannerList()

    {

        $bannerlist =  $this->common->readData('bannerlist');

        return view('admin.bannerlist', ['webset' => $this->webset, 'bannerlist' => $bannerlist]);

    }

    #生成编辑轮播界面

    public function editBanner($id)

    {

        $bannerlist =  $this->common->readData('bannerlist');

        $banner = $bannerlist[$id];

        return view('admin.editbanner', ['webset' => $this->webset, 'banner' => $banner, 'id' => $id]);

    }



    #生成添加导航页面

    public function addNav(){

        return view('admin.addnav',['webset' => $this->webset]);

    }

    #生成导航列表

    public function navList()

    {

        $navlist =  $this->common->navSort();

        return view('admin.navlist', ['webset' => $this->webset, 'navlist' => $navlist]);

    }

    #生成编辑导航界面

    public function editNav($id)

    {

        $navlist =  $this->common->readData('navlist');

        $nav = $navlist[$id];

        return view('admin.editnav', ['webset' => $this->webset, 'nav' => $nav, 'id' => $id]);

    }

    #生成cc防御设置界面

    public function ccDefense(){

        $cc_admin_ip = trim(implode('#',config('ccset.cc_admin_ip')),'#');

        return view('admin.ccdefense',['webset' => $this->webset,'cc_admin_ip'=>$cc_admin_ip]);

    }

    #生成授权提示页

    public function copyTip(){

        return view('admin.copyright');

    }


    #生成后台会员管理界面

    public function userList($name=null)
    {

        $userlist = $this->common->readData('user');
        $userlist = $userlist ? $userlist : array();

        $i = 0;
        $list = [];
        foreach($userlist as $v){
            if(!array_key_exists('addtime',$v)){
                $v['addtime'] = $i;
            }
            krsort($v);
            $list[]= $v;
            $i++;
        }
        if($name!=null){
            $kk = [];
            foreach($list as $key=>$v){
                if(strpos($v['username'],$name) !== false){
                    $kk[$key]=$v;
                }
            }
            $list=$kk;
        }
        return view('admin.userList', ['webset' => $this->webset, 'list' => $list]);

    }

	#生成后台会员添加界面
    public function userAdd()
    {
    	return view('admin.userAdd',['webset' => $this->webset]);

    }

    #生成编辑会员界面

    public function userEdit($id)

    {

        $userlist =  $this->common->readData('user');

        $user = $userlist[$id];

        return view('admin.userEdit', ['webset' => $this->webset, 'user' => $user, 'id' => $id]);

    }

    //排序
    private function kamisort(array $array, $key, $asc = true) {
    	$result = array();
        
	    $values = array();
	    foreach ($array as $id => $value) {
	        $values[$id] = isset($value[$key]) ? $value[$key] : '';
	    }
	        
	    if ($asc) {
	        asort($values);
	    }
	    else {
	        arsort($values);
	    }
	        
	    foreach ($values as $key => $value) {
	        $result[$key] = $array[$key];
	    }
	        
	    return $result;

    }

     #生成后台卡密管理界面

    public function kamiList()
    {

        $list = $this->common->readData('kami');
        $list = $list ? $list : array();
        if ($list) {
        	$list = $this->kamisort($list, 'createtime', false);
        }
        return view('admin.kamiList', ['webset' => $this->webset, 'list' => $list]);

    }

	#生成后台卡密添加界面
    public function kamiAdd()
    {
    	return view('admin.kamiAdd',['webset' => $this->webset]);

    }
    
    #后台卡密链接设置界面
    public function kamiUrl()
    {
    	$kamiUrl = config('kamiUrl');
    	return view('admin.kamiUrl',['kamiUrl'=>$kamiUrl,'webset' => $this->webset]);

    }


}