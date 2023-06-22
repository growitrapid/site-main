// @ts-nocheck

import { Theme } from "next-auth";
import TinyUrl from "tinyurl"

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export async function html(params: { url: string; host: string; theme: Theme }) {
    const { url, host, theme } = params

    const escapedHost = host.replace(/\./g, "&#8203;.")

    const shorturl = await TinyUrl.shorten(url);

    return `
    <!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
#outlook a{padding:0;}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}table,td{border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}p{display:block;margin:0;}
</style>
<!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">
.ogf{width:100% !important;}
</style>
<![endif]-->
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css?family=Inter:600,700,500,400,800" rel="stylesheet" type="text/css">
<style type="text/css">

</style>
<!--<![endif]-->
<style type="text/css">
@media only screen and (min-width:599px){.xc181{width:181px!important;max-width:181px;}.xc50{width:50px!important;max-width:50px;}.xc16{width:16px!important;max-width:16px;}.xc139{width:139px!important;max-width:139px;}.xc182{width:182px!important;max-width:182px;}.xc536{width:536px!important;max-width:536px;}.pc100{width:100%!important;max-width:100%;}.pc5-6338{width:5.6338%!important;max-width:5.6338%;}.pc2-8169{width:2.8169%!important;max-width:2.8169%;}.pc27-2887{width:27.2887%!important;max-width:27.2887%;}.pc61-4437{width:61.4437%!important;max-width:61.4437%;}}
</style>
<style media="screen and (min-width:599px)">.moz-text-html .xc181{width:181px!important;max-width:181px;}.moz-text-html .xc50{width:50px!important;max-width:50px;}.moz-text-html .xc16{width:16px!important;max-width:16px;}.moz-text-html .xc139{width:139px!important;max-width:139px;}.moz-text-html .xc182{width:182px!important;max-width:182px;}.moz-text-html .xc536{width:536px!important;max-width:536px;}.moz-text-html .pc100{width:100%!important;max-width:100%;}.moz-text-html .pc5-6338{width:5.6338%!important;max-width:5.6338%;}.moz-text-html .pc2-8169{width:2.8169%!important;max-width:2.8169%;}.moz-text-html .pc27-2887{width:27.2887%!important;max-width:27.2887%;}.moz-text-html .pc61-4437{width:61.4437%!important;max-width:61.4437%;}
</style>
<style type="text/css">
@media only screen and (max-width:598px){table.fwm{width:100%!important;}td.fwm{width:auto!important;}}
</style>
<style type="text/css">
u+.emailify .gs{background:#000;mix-blend-mode:screen;display:inline-block;padding:0;margin:0;}u+.emailify .gd{background:#000;mix-blend-mode:difference;display:inline-block;padding:0;margin:0;}u+.emailify a,#MessageViewBody a,a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important;}span.MsoHyperlink{mso-style-priority:99;color:inherit;}span.MsoHyperlinkFollowed{mso-style-priority:99;color:inherit;}td.b .klaviyo-image-block{display:inline;vertical-align:middle;}
@media only screen and (max-width:599px){.emailify{height:100%!important;margin:0!important;padding:0!important;width:100%!important;}u+.emailify .glist{margin-left:1em!important;}td.ico.v>div.il>a.l.m,td.ico.v .mn-label{padding-right:0!important;padding-bottom:16px!important;}td.x{padding-left:0!important;padding-right:0!important;}.fwm img{max-width:100%!important;height:auto!important;}.aw img{width:auto!important;margin-left:auto!important;margin-right:auto!important;}.ah img{height:auto!important;}td.b.nw>table,td.b.nw a{width:auto!important;}td.stk{border:0!important;}td.u{height:auto!important;}br.sb{display:none!important;}.thd-1 .i-thumbnail{display:inline-block!important;height:auto!important;overflow:hidden!important;}.hd-1{display:block!important;height:auto!important;overflow:visible!important;}.ht-1{display:table!important;height:auto!important;overflow:visible!important;}.hr-1{display:table-row!important;height:auto!important;overflow:visible!important;}.hc-1{display:table-cell!important;height:auto!important;overflow:visible!important;}div.r.pr-16>table>tbody>tr>td,div.r.pr-16>div>table>tbody>tr>td{padding-right:16px!important}div.r.pl-16>table>tbody>tr>td,div.r.pl-16>div>table>tbody>tr>td{padding-left:16px!important}div.g.mb-16>table>tbody>tr>td{padding-bottom:16px!important}.hm-1{display:none!important;max-width:0!important;max-height:0!important;overflow:hidden!important;mso-hide:all!important;}td.x.al-c>div,td.x.al-c>div>p,td.x.al-c>p,td.x.al-c>div>h1,td.x.al-c>h1{text-align:center!important}td.b.al-c>table{display:inline-block!important;}td.al-c{text-align:center!important}}
@media (prefers-color-scheme:dark){.emailify.db-0D1117,div.bg.db-0D1117{background-color:#0D1117!important;}}
</style>
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<!--[if gte mso 9]>
<style>li{text-indent:-1em;}
</style>
<![endif]-->
</head>
<body lang="en" link="#DD0000" vlink="#DD0000" class="emailify" style="mso-line-height-rule:exactly;word-spacing:normal;background-color:#e5e5e5;"><div class="bg db-0D1117" style="background-color:#e5e5e5;" lang="en">
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]-->
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#fffffe;background-color:#fffffe;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:32px 32px 16px 32px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
<![endif]--><div class="xc536 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x  al-c m" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:114%"><span style="font-size:28px;font-family:Inter,Arial,sans-serif;font-weight:700;color:#000000;line-height:114%;">Sign in to POLARIS</span></p></div>
</td></tr><tr><td align="left" class="x  al-c m" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:150%"><span style="font-size:16px;font-family:Inter,Arial,sans-serif;font-weight:500;color:#777777;line-height:150%;">Welcome to Polaris - the premier destination for AI enthusiasts and innovators. Our community is dedicated to advancing the field of artificial intelligence and making it accessible to everyone.</span></p></div>
</td></tr><tr><td align="center" class="d  m" style="font-size:0;padding:0;padding-bottom:8px;word-break:break-word;"><p style="border-top:solid 1px #cccccc;font-size:1px;margin:0px auto;width:100%;"></p>
<!--[if mso | IE]>
<table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #cccccc;font-size:1px;margin:0px auto;width:536px;" role="none" width="536px"><tr><td style="height:0;line-height:0;"> &nbsp;
</td></tr></table>
<![endif]-->
</td></tr><tr><td align="left" class="x  al-c m" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:150%"><span style="font-size:16px;font-family:Inter,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">To Sign in to your account, please click on this button.</span></p></div>
</td></tr><tr><td class="s  m" style="font-size:0;padding:0;padding-bottom:8px;word-break:break-word;"><div style="height:4px;line-height:4px;">&#8202;</div>
</td></tr><tr><td align="left" vertical-align="middle" class="b  al-c m" style="font-size:0;padding:0;padding-bottom:8px;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border-collapse:separate;width:108px;line-height:100%;"><tbody><tr><td align="center" bgcolor="#00bcee" role="none" style="border:none;border-radius:60px 60px 60px 60px;cursor:auto;mso-padding-alt:12px 0px 12px 0px;background:#00bcee;" valign="middle"> <a href="${url}" style="display:inline-block;width:108px;background:#00bcee;color:#ffffff;font-family:Inter,Arial,sans-serif;font-size:13px;font-weight:normal;line-height:100%;margin:0;text-decoration:none;text-transform:none;padding:12px 0px 12px 0px;mso-padding-alt:0;border-radius:60px 60px 60px 60px;" target="_blank"> <span style="font-size:14px;font-family:Inter,Arial,sans-serif;font-weight:700;color:#ffffff;line-height:121%;letter-spacing:2px;">SIGN IN</span></a>
</td></tr></tbody></table>
</td></tr><tr><td align="left" class="x  al-c m" style="font-size:0;padding-bottom:8px;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:150%"><span style="font-size:16px;font-family:Inter,Arial,sans-serif;font-weight:400;color:#777777;line-height:150%;">Or, use this link: <a href="${shorturl}" target="_blank">${shorturl}</a></span></p></div>
</td></tr><tr><td class="s  m" style="font-size:0;padding:0;padding-bottom:8px;word-break:break-word;"><div style="height:19px;line-height:19px;">&#8202;</div>
</td></tr><tr><td align="left" class="x  al-c" style="font-size:0;padding-bottom:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:150%"><span style="font-size:16px;font-family:Inter,Arial,sans-serif;font-weight:800;color:#777777;line-height:150%;">If you did not request this email you can safely ignore it.</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="none" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
<![endif]--><div class="r  pr-16 pl-16" style="background:#eeeeee;background-color:#eeeeee;margin:0px auto;max-width:600px;">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="none" style="background:#eeeeee;background-color:#eeeeee;width:100%;"><tbody><tr><td style="border:none;direction:ltr;font-size:0;padding:16px 16px 16px 16px;text-align:left;">
<!--[if mso | IE]>
<table role="none" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="width:568px;">
<![endif]--><div class="pc100 ogf" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
<!--[if mso | IE]>
<table border="0" cellpadding="0" cellspacing="0" role="none"><tr><td style="vertical-align:middle;width:31px;">
<![endif]--><div class="pc5-6338 ogf m c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:5.6338%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="i" style="font-size:0;padding:0;word-break:break-word;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border-collapse:collapse;border-spacing:0;"><tbody><tr><td style="width:31px;"> <img alt src="https://e.hypermatic.com/93a522f6b729b594283ce038dbe8b836.png" style="border:0;border-radius:5px 5px 5px 5px;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title width="31" height="auto">
</td></tr></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td><td style="vertical-align:top;width:15px;">
<![endif]--><div class="pc2-8169 ogf g" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:2.8169%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" width="100%"><tbody><tr><td style="vertical-align:top;padding:0;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style width="100%"><tbody></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td><td style="vertical-align:middle;width:154px;">
<![endif]--><div class="pc27-2887 ogf m c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:27.2887%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="left" class="x" style="font-size:0;word-break:break-word;"><div style="text-align:left;"><p style="Margin:0;text-align:left;mso-line-height-alt:123%"><span style="font-size:13px;font-family:Inter,Arial,sans-serif;font-weight:700;color:#3e3e3e;line-height:123%;">POLARIS AI © ${new Date().getFullYear()}, Inc.</span></p></div>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td><td style="vertical-align:top;width:15px;">
<![endif]--><div class="pc2-8169 ogf g" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:2.8169%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" width="100%"><tbody><tr><td style="vertical-align:top;padding:0;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style width="100%"><tbody></tbody></table>
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td><td style="vertical-align:middle;width:349px;">
<![endif]--><div class="pc61-4437 ogf c" style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:61.4437%;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="border:none;vertical-align:middle;" width="100%"><tbody><tr><td align="right" class="o" style="font-size:0;padding:0;word-break:break-word;">
<!--[if mso | IE]>
<table align="right" border="0" cellpadding="0" cellspacing="0" role="none"><tr><td>
<![endif]-->
<table align="right" border="0" cellpadding="0" cellspacing="0" role="none" style="float:none;display:inline-table;"><tbody><tr class="e  m"><td style="padding:0 16px 0 0;vertical-align:middle;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"> <a href="https://github.com/AI-POLARIS" target="_blank"> <img alt="Github" title height="20" src="https://e.hypermatic.com/16c9d893ed0a1685a42a68a79acea685.png" style="display:block;" width="20"></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso | IE]>
</td><td>
<![endif]-->
<table align="right" border="0" cellpadding="0" cellspacing="0" role="none" style="float:none;display:inline-table;"><tbody><tr class="e  m"><td style="padding:0 16px 0 0;vertical-align:middle;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"> <a href="https://discord.gg/wjneJAH485" target="_blank"> <img alt="Discord" title height="20" src="https://e.hypermatic.com/9fe85aca31ba43842efcbb07480863dc.png" style="display:block;" width="20"></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso | IE]>
</td><td>
<![endif]-->
<table align="right" border="0" cellpadding="0" cellspacing="0" role="none" style="float:none;display:inline-table;"><tbody><tr class="e  "><td style="padding:0;padding-right:0;vertical-align:middle;">
<table border="0" cellpadding="0" cellspacing="0" role="none" style="width:20px;"><tbody><tr><td style="font-size:0;height:20px;vertical-align:middle;width:20px;"> <a href="polaris.ai.official@gmail.com" target="_blank"> <img alt="Email" title height="20" src="https://e.hypermatic.com/c7387676fdd18a7fdcd6dcff8d1c90b4.png" style="display:block;" width="20"></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]-->
</td></tr></tbody></table></div>
<!--[if mso | IE]>
</td></tr></table>
<![endif]--></div>
</body>
</html>
    `
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
export function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}