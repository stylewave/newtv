<?php
namespace App\Http\Controllers\Index;
/**
 * version:1.0
 * by:wave
 */

use App\Http\Controllers\Common\CommonController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Core\CoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class IndexController extends Controller
{

    private $core;
    private $common;
    private $jk;
    private $fenlei;
    private $newlist;
    private $yqlist;
    private $bannerlist;
    private $nav;
    private $kamiUrl;
    public function __construct()
    {
        $this->core = new \App\Http\Controllers\Core\CoreController();
        $this->common = new \App\Http\Controllers\Common\CommonController();
        $this->jk = config('jkset');
        $this->fenlei = config('fenlei');
        $this->newlist = $this->common->{'readData'}('dydata');
        $this->yqlist = $this->common->{'readData'}('yqlink');
        $this->bannerlist = $this->common->{'readData'}('bannerlist');
        $this->nav = $this->common->{'navSort'}();
        $this->kamiUrl = config('kamiUrl');
    }
    public function index($action = '')
    {
       
        if (Cache::{'has'}('static_index') && $action == '') {
            return Cache::{'get'}('static_index');
        }
        $dytype = $this->fenlei['movie'];
        $ds = $this->core->{'dsjList'}('all', 1);
        $zy = $this->core->{'zyList'}('all', 1);
        $dm = $this->core->{'dmList'}('all', 1);
        $dy = $this->core->{'dyList'}('all', 1);
       
        $res = view('template.' . config('webset.webtemplate') . '.index', ['dsjs' => $ds, 'dys' => $dy, 'zys' => $zy, 'dms' => $dm, 'index' => 1, 'yqlist' => $this->yqlist, 'dydata' => array_reverse($this->newlist), 'dytype' => $dytype, 'bannerlist' => $this->bannerlist, 'navlist' => $this->nav])->{'__toString'}();
        Cache::{'forever'}('static_index', $res);
        return $res;
    }

    public function dy($cat = 'all', $page = '1')
    {
        $dys = $this->core->{'dyList'}($cat, $page);
        $pagehtml = $this->{'getPageHtml'}($page, 24, $cat, 'movielist');
        // var_dump($dys);die;
        return view('template.' . config('webset.webtemplate') . '.movie', ['dys' => $dys, 'pagehtml' => $pagehtml, 'dytype' => $this->fenlei['movie'], 'yqlist' => $this->yqlist, 'navlist' => $this->nav]);
    }
    public function cX()
    {
        return view('template.' . config('webset.webtemplate') . '.cx', ['dydata' => array_reverse($this->newlist), 'yqlist' => $this->yqlist, 'navlist' => $this->nav]);
    }
    public function tv($cat = 'all', $page = '1')
    {
       
        $dsj = $this->core->{'dsjList'}($cat, $page);
        $pagehtml = $this->{'getPageHtml'}($page, 24, $cat, 'tvlist');
      
        return view('template.' . config('webset.webtemplate') . '.tv', ['dsj' => $dsj, 'pagehtml' => $pagehtml, 'tvtype' => $this->fenlei['tv'], 'yqlist' => $this->yqlist, 'navlist' => $this->nav]);
    }
    public function zy($cat = 'all', $page = '1')
    {
        $zys = $this->core->{'zyList'}($cat, $page);
        $pagehtml = $this->{'getPageHtml'}($page, 24, $cat, 'zylist');
        return view('template.' . config('webset.webtemplate') . '.zy', ['zys' => $zys, 'pagehtml' => $pagehtml, 'zytype' => $this->fenlei['zy'], 'yqlist' => $this->yqlist, 'navlist' => $this->nav]);
    }
    public function dm($cat = 'all', $page = '1')
    {
        $dms = $this->core->{'dmList'}($cat, $page);
        $pagehtml = $this->{'getPageHtml'}($page, 24, $cat, 'dmlist');
        return view('template.' . config('webset.webtemplate') . '.dm', ['dms' => $dms, 'pagehtml' => $pagehtml, 'dmtype' => $this->fenlei['dm'], 'yqlist' => $this->yqlist, 'navlist' => $this->nav]);
    }
    public function play(Request $request, $play)
    {
        $has = $this->common->{'filterQq'}($play);
        if ($has == 1) {
            return view('template.' . config('webset.webtemplate') . '.qqtip');
        }
        $history = $this->{'getHistroy'}($request);
        if ($history) {
            krsort($history);
        }
        if (is_numeric($play)) {
            $path = DATA_PATH . 'dydata.json';
            $str = file_get_contents($path);
            $dylist = json_decode($str, true);
            $dy = $dylist[$play];
            $sfset = config('sfset');
            if ($sfset['cx']) {
                if (!$request->{'session'}()->{'get'}('username')) {
                    exit('<script>alert(\'观看该影片需VIP会员，请先登录！\');window.location=\'/login.html\';</script>');
                }
                $username = $request->{'session'}()->{'get'}('username');
                $userlist = $this->common->{'readData'}('user');
                $userinfo = $userlist[$username];
                if ($userinfo['status'] != 1 || $userinfo['group'] == 1 || $userinfo['viptime'] < time()) {
                    exit('<script>alert(\'请先充值成为VIP会员！\');window.location=\'/ucenter.html\';</script>');
                }
            }
            $js = $this->common->{'getJs'}($dy['dyaddr']);
            $dy['dyaddr'] = $js;
            return view('template.' . config('webset.webtemplate') . '.otherplay', ['cxs' => $dy, 'yqlist' => $this->yqlist, 'history' => $history, 'navlist' => $this->nav]);
        }
        $url = base64_decode($play);
        if (strpos($url, 'om/m/') !== false) {
            $res = $this->core->{'getDyPlay'}($url);
            return view('template.' . config('webset.webtemplate') . '.mplay', ['desc' => $res[0]['desc'], 'pm' => $res[0]['title'], 'dyplay' => $res, 'jk' => $this->jk, 'yqlist' => $this->yqlist, 'history' => $history, 'navlist' => $this->nav]);
        } elseif (strpos($url, 'om/tv/') !== false) {
            $playlist = $this->{'getTvList'}($url, 2);
            $res = $this->core->{'getDsjPlay'}($url);
            if ($playlist) {
                return view('template.' . config('webset.webtemplate') . '.tvplay', ['desc' => $res[0]['desc'], 'pm' => $res[0]['title'], 'js' => $playlist, 'jk' => $this->jk, 'yqlist' => $this->yqlist, 'history' => $history, 'navlist' => $this->nav]);
            }
        } elseif (strpos($url, 'om/ct/') !== false) {
            $playlist = $this->{'getTvList'}($url, 4);
            $res = $this->core->{'getDsjPlay'}($url);
            if ($playlist) {
                return view('template.' . config('webset.webtemplate') . '.dmplay', ['desc' => $res[0]['desc'], 'pm' => $res[0]['title'], 'js' => $playlist, 'jk' => $this->jk, 'yqlist' => $this->yqlist, 'history' => $history, 'navlist' => $this->nav]);
            }
        } elseif (strpos($url, 'om/va/') !== false) {
            $res = $this->{'getZyList'}($url);
            return view('template.' . config('webset.webtemplate') . '.zyplay', ['desc' => $res[0]['desc'], 'pm' => $res[0]['bt'], 'zylist' => $res, 'zd' => $res[0]['zd'], 'jk' => $this->jk, 'yqlist' => $this->yqlist, 'history' => $history, 'navlist' => $this->nav]);
        }
    }
    public function zhiBo()
    {
        $path = DATA_PATH . 'zblist.json';
        $str = file_get_contents($path);
        $zblist = json_decode($str, true);
        return view('template.' . config('webset.webtemplate') . '.zhibo', ['yqlist' => $this->yqlist, 'zblist' => $zblist, 'navlist' => $this->nav]);
    }
    public function zbPlay($id)
    {
        $path = DATA_PATH . 'zblist.json';
        $str = file_get_contents($path);
        $zblist = json_decode($str, true);
        $zb = $zblist[$id];
        return view('template.' . config('webset.webtemplate') . '.zbplay', ['yqlist' => $this->yqlist, 'zb' => $zb, 'navlist' => $this->nav]);
    }
    private function getTvList($url, $type)
    {
        $url = str_replace('https://', '', $url);
        $arr = explode('/', $url);
        $id = str_replace('.html', '', $arr[2]);
        $arr = ['youku' => '优酷视频', 'qq' => '腾讯视频', 'imgo' => '芒果TV', 'qiyi' => '爱奇艺', 'levp' => '乐视视频', 'cntv' => 'CNTV', 'sohu' => '搜狐视频', 'tudou' => '土豆视频', 'pptv' => 'PPTV'];
        $jg = [];
        foreach ($arr as $key => $v) {
            $api = 'https://www.360kan.com/cover/switchsite?site=' . $key . '&id=' . $id . '&category=' . $type;
            $res = json_decode($this->common->{'curl_get'}($api), true);
            if ($res['error'] == 0) {
                $sp['name'] = $v;
                $sp['data'] = $res['data'];
                $jg[] = $sp;
            }
        }
        return $jg;
    }
    private function getZyList($url)
    {
        $res = $this->core->{'getZyPlay'}($url);
        return $res;
    }
    public function appInfo()
    {
        return view('template.' . config('webset.webtemplate') . '.appinfo');
    }
    public function Search($key)
    {
        $res = $this->core->{'getSearch'}($key);
        $cxs = $this->common->{'seacherCx'}($key);
        return view('template.' . config('webset.webtemplate') . '.search', ['ss' => $res, 'cxs' => $cxs, 'searchkey' => $key, 'navlist' => $this->nav, 'yqlist' => $this->yqlist]);
    }
    private function getPageHtml($var_0, $var_4, $cat, $type)
    {
        $var_6 = 5;
        $var_1 = '';
        $var_0 = $var_0 < 1 ? 1 : $var_0;
        $var_0 = $var_0 > $var_4 ? $var_4 : $var_0;
        $var_4 = $var_4 < $var_0 ? $var_0 : $var_4;
        $var_3 = $var_0 - floor($var_6 / 2);
        $var_3 = $var_3 < 1 ? 1 : $var_3;
        $var_2 = $var_0 + floor($var_6 / 2);
        $var_2 = $var_2 > $var_4 ? $var_4 : $var_2;
        $var_5 = $var_2 - $var_3 + 1;
        if ($var_5 < $var_6 && $var_3 > 1) {
            $var_3 = $var_3 - ($var_6 - $var_5);
            $var_3 = $var_3 < 1 ? 1 : $var_3;
            $var_5 = $var_2 - $var_3 + 1;
        }
        if ($var_5 < $var_6 && $var_2 < $var_4) {
            $var_2 = $var_2 + ($var_6 - $var_5);
            $var_2 = $var_2 > $var_4 ? $var_4 : $var_2;
        }
        if ($var_0 > 1) {
            if (config('webset.webtemplate') == 'wapian') {
                $var_1 .= '<li><a  title="上一页" href="' . '/' . $type . '/' . $cat . '/' . ($var_0 - 1) . '.html' . '"">上一页</a></li>';
            } else {
                $var_1 .= '<a  title="上一页" href="' . '/' . $type . '/' . $cat . '/' . ($var_0 - 1) . '.html' . '"">上一页</a>';
            }
        }
        for ($var_8 = $var_3; $var_8 <= $var_2; $var_8++) {
            if ($var_8 == $var_0) {
                if (config('webset.webtemplate') == 'wapian') {
                    $var_1 .= '<li><a style="background:#ff6651;"><font color="#fff">' . $var_8 . '</font></a></li>';
                } else {
                    $var_1 .= '<a style="background:#ff6651;"><font color="#fff">' . $var_8 . '</font></a>';
                }
            } else {
                if (config('webset.webtemplate') == 'wapian') {
                    $var_1 .= '<li><a href="' . '/' . $type . '/' . $cat . '/' . $var_8 . '.html' . '">' . $var_8 . '</a></li>';
                } else {
                    $var_1 .= '<a href="' . '/' . $type . '/' . $cat . '/' . $var_8 . '.html' . '">' . $var_8 . '</a>';
                }
            }
        }
        if ($var_0 < $var_2) {
            if (config('webset.webtemplate') == 'wapian') {
                $var_1 .= '<li><a  title="下一页" href="' . '/' . $type . '/' . $cat . '/' . ($var_0 + 1) . '.html' . '"">下一页</a></li>';
            } else {
                $var_1 .= '<a  title="下一页" href="' . '/' . $type . '/' . $cat . '/' . ($var_0 + 1) . '.html' . '"">下一页</a>';
            }
        }
        return $var_1;
    }
    public function jzAd()
    {
        return view('template.' . config('webset.webtemplate') . '.jzad');
    }
    public function history(Request $request)
    {
        $this->common->{'saveHistory'}($request);
    }
    public function getHistroy(Request $request)
    {
        $history = $request->{'cookie'}('history');
        if ($history) {
            return $history;
        }
    }
    public function login()
    {
        return view('template.' . config('webset.webtemplate') . '.login');
    }
    public function checkLogin(Request $request)
    {
        $post = $request->{'post'}();
        $userlist = $this->common->{'readData'}('user');
        if (isset($userlist[$post['username']]) && $userlist[$post['username']]['password'] == md5($post['password'])) {
            $request->{'session'}()->{'put'}('username', $post['username']);
            return redirect('ucenter.html');
        } else {
            exit('<script>alert(\'用户名或密码错误！\');history.back();</script>');
        }
    }
    public function logout(Request $request)
    {
        $request->{'session'}()->{'forget'}('username');
        return redirect('login.html');
    }
    public function ucenter(Request $request)
    {
       
        $username = $request->{'session'}()->{'get'}('username');
        $userlist = $this->common->{'readData'}('user');
        $userinfo = $userlist[$username];
        $userinfo['viptime'] = $userinfo['viptime'] ? date('Y-m-d', $userinfo['viptime']) : '';
        return view('template.' . config('webset.webtemplate') . '.ucenter', ['userinfo' => $userinfo, 'kamiUrl' => $this->kamiUrl]);
    }
    public function userinfo(Request $request)
    {
        $username = $request->{'session'}()->{'get'}('username');
        $userlist = $this->common->{'readData'}('user');
        $userinfo = $userlist[$username];
        return view('template.' . config('webset.webtemplate') . '.userinfo', ['userinfo' => $userinfo, 'kamiUrl' => $this->kamiUrl]);
    }
    public function chongzhi(Request $request)
    {
        $username = $request->{'session'}()->{'get'}('username');
        $userlist = $this->common->{'readData'}('user');
        $userinfo = $userlist[$username];
        return view('template.' . config('webset.webtemplate') . '.chongzhi', ['userinfo' => $userinfo, 'kamiUrl' => $this->kamiUrl]);
    }
   
}