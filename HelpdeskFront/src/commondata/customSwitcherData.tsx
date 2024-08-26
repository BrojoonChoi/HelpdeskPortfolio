//LTR TO RTL
export const LtrtoRtl = () => {
    document.querySelector("body")?.classList.add("rtl");
    document.querySelector("html[lang=en]")?.setAttribute("dir", "rtl");
    document.getElementById("bootstrapLink")?.setAttribute("href", `${import.meta.env.BASE_URL === 'production' ? "/" : "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.rtl.min.css"}`)
    document.querySelector(".app")?.classList.remove("ltr");

    localStorage.setItem("sashrtl", 'true');
    localStorage.removeItem("sashltr");
};
//RTL TO LTR
export const RtltoLtr = () => {
    document.querySelector("body")?.classList.add("ltr");
    document.querySelector("html[lang=en]")?.setAttribute("dir", "ltr");
    document.getElementById("bootstrapLink")?.setAttribute("href", `${import.meta.env.BASE_URL === 'production' ? "/" : "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"}`)
    document.querySelector(".app")?.classList.remove("rtl");
    localStorage.setItem("sashltr", 'true');
    localStorage.removeItem("sashrtl");
};

//VERTICALMENU
// Color theme
export const LightTheme = () => {
    let lightHeader1 = document.querySelector("#myonoffswitch1") as HTMLInputElement
    lightHeader1.checked = true;

    document.querySelector("body")?.classList.add("light-mode");
    document.querySelector("body")?.classList.remove("transparent-mode");
    document.querySelector("body")?.classList.remove("dark-mode");

    let html: any = document.querySelector("html")
    html.style = "";
    localStorage.removeItem('Sashdarktheme');
    
    OpacityValuePrimary();

    localStorage.setItem("sashlighttheme", 'true')
    localStorage.removeItem("sashtransperenttheme")
};

export const dark = () => {
    
    document.querySelector("body")?.classList.add("dark-mode");
    document.querySelector("body")?.classList.remove("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");


    localStorage.setItem("sashdarktheme", 'true');
    localStorage.removeItem('sashlightmode');

    let myonoffswitch2 = document.querySelector("#myonoffswitch2") as HTMLInputElement
    myonoffswitch2.checked = true;
    
};

export const Transparent = () => {
    document.querySelector("body")?.classList.add("transparent-mode");

    document.querySelector(".app")?.classList.remove("light-mode");
    document.querySelector(".app")?.classList.remove("dark-mode");
    document.querySelector(".app")?.classList.remove("bg-img1");
    document.querySelector(".app")?.classList.remove("bg-img2");
    document.querySelector(".app")?.classList.remove("bg-img3");
    document.querySelector(".app")?.classList.remove("bg-img4");
    let myonoffswitchTransparent = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    myonoffswitchTransparent.checked = true;

    localStorage.removeItem("sashlighttheme");
    localStorage.removeItem("Sashdarktheme");
    OpacityValuePrimary();
    localStorage.setItem('sashtransperenttheme', 'true')
};

export function checkHoriMenu() {
    let menuWidth: any = document.querySelector(".horizontal-main");
    let menuItems: any = document.querySelector(".side-menu");
    let mainSidemenuWidth: any = document.querySelector(".main-sidemenu");

    let menuContainerWidth =
        menuWidth?.offsetWidth - mainSidemenuWidth?.offsetWidth;
    let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginLeft.split("px")[0])
    );
    let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuItems).marginRight.split("px")[0])
    );
    let check =
        menuItems.scrollWidth + (0 - menuWidth?.offsetWidth) + menuContainerWidth;

    if (document.querySelector(".app")?.classList.contains("ltr")) {
        menuItems.style.marginRight = 0;
    } else {
        menuItems.style.marginLeft = 0;
    }

    if (menuItems.scrollWidth - 2 < menuWidth?.offsetWidth - menuContainerWidth) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-right")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
        document.querySelector(".slide-rightRTL")?.classList.add("d-none");
    } else if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
    } else if (marginLeftValue !== -check || marginRightValue !== -check) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
    }
    if (menuItems.scrollWidth - 2 > menuWidth?.offsetWidth - menuContainerWidth) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-right")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
        document.querySelector(".slide-rightRTL")?.classList.remove("d-none");
    }
    if (marginLeftValue === 0 || marginRightValue === 0) {
        document.querySelector(".slide-left")?.classList.add("d-none");
        document.querySelector(".slide-leftRTL")?.classList.add("d-none");
    }
    if (marginLeftValue !== 0 || marginRightValue !== 0) {
        document.querySelector(".slide-left")?.classList.remove("d-none");
        document.querySelector(".slide-leftRTL")?.classList.remove("d-none");
    }
}

export function handleThemeUpdate(cssVars:any) {

    const root: any = document.querySelector(":root");
    const keys = Object.keys(cssVars);

    keys.forEach((key) => {
        root.style.setProperty(key, cssVars[key]);
    });
}
// to check the value is hexa or not
const isValidHex = (hexValue:any) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);

const getChunksFromString = (st:any, chunkSize:any) =>
    st.match(new RegExp(`.{${chunkSize}}`, "g"));
// convert hex value to 256
const convertHexUnitTo256 = (hexStr:any) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);
// get alpha value is equla to 1 if there was no value is asigned to alpha in function
const getAlphafloat = (a:any, alpha:any) => {
    if (typeof a !== "undefined") {
        return a / 255;
    }
    if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
        return 1;
    }
    return alpha;
};

// convertion of hex code to rgba code

export function hexToRgba(hexValue:any, alpha = 1) {
    if (!isValidHex(hexValue)) {
        return null;
    }
    const chunkSize = Math.floor((hexValue.length - 1) / 3);
    const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
}
// LIGHT PRIMARY

export function dynamicLightPrimaryColor(primaryColor:any, color:any) {
    primaryColor.forEach((item:any) => {
        const cssPropName = `--primary-${item.getAttribute("data-id")}`;
        const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
        const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;
        handleThemeUpdate({
            [cssPropName]: color,
            [cssPropName1]: hexToRgba(color, 0.9),
            [cssPropName2]: color,
        });
    });
}
// DARK PRIMARY

export function dynamicDarkPrimaryColor(events: any, color: any) {

    events.forEach(() => {
        const cssPropName = `--primary-bg-color`;
        const cssPropName1 = `--primary-bg-hover`;
        const cssPropName2 = `--primary-bg-border`;
        handleThemeUpdate({
            [cssPropName]: color,
            [cssPropName1]: color,
            [cssPropName2]: color,
        });
    });
};
// TRANSPERENT PRIMARY

export function dynamicTransparentPrimaryColor(events: any, color: any) {
    events.forEach(() => {
        const cssPropName = `--primary-bg-color`;
        const cssPropName1 = `--primary-bg-hover`;
        const cssPropName2 = `--primary-bg-border`;
        handleThemeUpdate({
            [cssPropName]: hexToRgba(color),
            [cssPropName1]: hexToRgba(color),
            [cssPropName2]: hexToRgba(color),
        });
    });

}

// TRANSPERENT BG PRIMARY

export function dynamicBgTransparentBackground(primaryColor:any, color:any) {
    primaryColor.forEach((item:any) => {
        const cssPropName1 = `--transparent-${item.getAttribute("data-id5")}`;
        handleThemeUpdate({
            [cssPropName1]: hexToRgba(color),
        });
    });
}

export function dynamicBgImgTransparentPrimaryColor(primaryColor:any, color:any) {
    primaryColor.forEach((item:any) => {
        const cssPropName = `--primary-${item.getAttribute("data-id")}`;
        const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
        const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;

        handleThemeUpdate({
            [cssPropName]: hexToRgba(color),
            [cssPropName1]: hexToRgba(color),
            [cssPropName2]: hexToRgba(color),
        });
    });
    OpacityValuePrimary();
}

// TRANSPERENT STYLE

function transparentStyle() {
    document.querySelector(".app")?.classList.remove("light-menu");
    document.querySelector(".app")?.classList.remove("dark-menu");
    document.querySelector(".app")?.classList.remove("color-menu");
    document.querySelector(".app")?.classList.remove("gradient-menu");
    document.querySelector(".app")?.classList.remove("header-light");
    document.querySelector(".app")?.classList.remove("color-header");
    document.querySelector(".app")?.classList.remove("dark-header");
    document.querySelector(".app")?.classList.remove("gradient-header");
}

// TRANSPERENT BG IMAGE PRIMARY

// BG IMAGE-1

export function bgimage1() {
    document.querySelector("body")?.classList.add("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");
    let TransparentTheme = document.getElementById("myonoffswitchTransparent") as HTMLInputElement
    TransparentTheme.checked = true;
    localStorage.setItem("sashBgImage", "bg-img1");
    transparentStyle();

    document.querySelector("body")?.classList.add("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");
    document.querySelector("body")?.classList.remove("dark-mode");
    localStorage.removeItem("sashprimaryColor");
    localStorage.removeItem("sashprimaryHoverColor");
    localStorage.removeItem("sashprimaryBorderColor");
    localStorage.removeItem("sashprimaryTransparent");
    localStorage.removeItem("sashdarkPrimaryColor");
    localStorage.removeItem("sashtransparentPrimaryColor");
    localStorage.removeItem("sashtransparentBgColor");

    let GradientHeader = document.querySelector("#myonoffswitch2") as HTMLInputElement
    GradientHeader.checked = false;
    let LightTheme = document.querySelector("#myonoffswitch1") as HTMLInputElement
    LightTheme.checked = false;
    let switchTransparent = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    switchTransparent.checked = true;

    document.querySelector("html")?.style.removeProperty("--transparent-body");
}

// BG IMAGE-2

export function bgimage2() {
    transparentStyle();
    document.querySelector("body")?.classList.add("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img4");
    let ThemeStyle = document.getElementById("myonoffswitchTransparent") as HTMLInputElement
    ThemeStyle.checked = true;
    localStorage.setItem("sashBgImage", "bg-img2");
    document.querySelector("html")?.style.removeProperty("--transparent-body");

    document.querySelector("body")?.classList.add("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");
    document.querySelector("body")?.classList.remove("dark-mode");
    localStorage.removeItem("sashprimaryColor");
    localStorage.removeItem("sashprimaryHoverColor");
    localStorage.removeItem("sashprimaryBorderColor");
    localStorage.removeItem("sashprimaryTransparent");
    localStorage.removeItem("sashdarkPrimaryColor");
    localStorage.removeItem("sashtransparentPrimaryColor");
    localStorage.removeItem("sashtransparentBgColor");

    let DarkTheme = document.querySelector("#myonoffswitch2") as HTMLInputElement
    DarkTheme.checked = false;
    let LightTheme = document.querySelector("#myonoffswitch1") as HTMLInputElement
    LightTheme.checked = false;
    let TransparentTheme = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    TransparentTheme.checked = true;
}

// BG IMAGE-3

export function bgimage3() {
    document.querySelector("body")?.classList.add("bg-img3");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img4");
    let switchTransparent = document.getElementById("myonoffswitchTransparent") as HTMLInputElement
    switchTransparent.checked = true;
    localStorage.setItem("sashBgImage", "bg-img3");
    document.querySelector("html")?.style.removeProperty("--transparent-body");
    transparentStyle();

    document.querySelector("body")?.classList.add("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");
    document.querySelector("body")?.classList.remove("dark-mode");

    localStorage.removeItem("sashprimaryColor");
    localStorage.removeItem("sashprimaryHoverColor");
    localStorage.removeItem("sashprimaryBorderColor");
    localStorage.removeItem("sashprimaryTransparent");
    localStorage.removeItem("sashdarkPrimaryColor");
    localStorage.removeItem("sashtransparentPrimaryColor");
    localStorage.removeItem("sashtransparentBgColor");

    let DarkTheme = document.querySelector("#myonoffswitch2") as HTMLInputElement
    DarkTheme.checked = false;
    let offswitch = document.querySelector("#myonoffswitch1") as HTMLInputElement
    offswitch.checked = false;
    let offswitchTransparent = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    offswitchTransparent.checked = true;
}

// BG IMAGE-4
export function bgimage4() {
    document.querySelector("body")?.classList.add("bg-img4");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    let bgimage4s = document.getElementById("myonoffswitchTransparent") as HTMLInputElement
    bgimage4s.checked = true;
    localStorage.setItem("sashBgImage", "bg-img4");
    document.querySelector("html")?.style.removeProperty("--transparent-body");
    transparentStyle();

    document.querySelector("body")?.classList.add("transparent-mode");
    document.querySelector("body")?.classList.remove("light-mode");
    document.querySelector("body")?.classList.remove("dark-mode");
    localStorage.removeItem("sashprimaryColor");
    localStorage.removeItem("sashprimaryHoverColor");
    localStorage.removeItem("sashprimaryBorderColor");
    localStorage.removeItem("sashprimaryTransparent");
    localStorage.removeItem("sashdarkPrimaryColor");
    localStorage.removeItem("sashtransparentPrimaryColor");
    localStorage.removeItem("sashtransparentBgColor");

    let GradientHeader = document.querySelector("#myonoffswitch2") as HTMLInputElement
    GradientHeader.checked = false;
    let myonoffswitch = document.querySelector("#myonoffswitch1") as HTMLInputElement
    myonoffswitch.checked = false;
    let myonoffswitchTransparent = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    myonoffswitchTransparent.checked = true;
}

// RESET DATA

export function resetData1() {
    let lighttheme = document.querySelector("#myonoffswitch1") as HTMLInputElement
    lighttheme.checked = true;   //lighttheme
    
    let ltr = document.querySelector("#myonoffswitch23") as HTMLInputElement
    ltr.checked = true;  //Ltr
    let myonoffswitchTransparent = document.querySelector("#myonoffswitchTransparent") as HTMLInputElement
    myonoffswitchTransparent.checked = false; //transperant theme
   
    document.querySelector("body")?.classList.remove("bg-img4");
    document.querySelector("body")?.classList.remove("bg-img1");
    document.querySelector("body")?.classList.remove("bg-img2");
    document.querySelector("body")?.classList.remove("bg-img3");
    document.querySelector("body")?.classList.remove("transparent-mode");
    document.querySelector("body")?.classList.remove("dark-mode");

    document.querySelector(".main-sidemenu")?.classList.remove("container");
    document.querySelector(".main-container")?.classList.remove("container");
    document.querySelector(".side-app")?.classList.remove("container");

    document.querySelector(".app")?.classList.add("sidebar-mini");
    document.querySelector(".header")?.classList.add("app-header");
    document.querySelector(".main-content")?.classList.add("app-content");
    document.querySelector(".main-container")?.classList.add("container-fluid");
    

    document.querySelector("body")?.classList.add("ltr");
    document.querySelector("html[lang=en]")?.setAttribute("dir", "ltr");
    document.getElementById("bootstrapLink")?.setAttribute("href", `${import.meta.env.BASE_URL === 'production' ? "/" : "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"}`)
    document.querySelector("body")?.classList.remove("rtl");
    OpacityValuePrimary();
}

// COLOUR VARIABLE

export function OpacityValuePrimary() {
    let primaryColorVal = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-bg-color")
        .trim();


    //get variable
    let myVarVal =
        localStorage.getItem("sashprimaryColor") ||
        localStorage.getItem("sashdarkPrimaryColor") ||
        localStorage.getItem("sashtransparentPrimaryColor") ||
        localStorage.getItem("sashtransparent-bgImgPrimaryColor") ||
        localStorage.getItem("sashtransparentBgImgPrimary") ||
        primaryColorVal;


    let colorData = hexToRgba(myVarVal, 0.1);
    document.querySelector("html")?.style.setProperty("--primary01", colorData);
    
    
    let colorData1 = hexToRgba(myVarVal, 0.2);
    document.querySelector("html")?.style.setProperty("--primary02", colorData1);
    
    let colorData2 = hexToRgba(myVarVal, 0.3);
    document.querySelector("html")?.style.setProperty("--primary03", colorData2);

    let colorData3 = hexToRgba(myVarVal, 0.6);
    document.querySelector("html")?.style.setProperty("--primary06", colorData3);

    let colorData4 = hexToRgba(myVarVal, 0.9);
    document.querySelector("html")?.style.setProperty("--primary09", colorData4);

    let colorID = hexToRgba(myVarVal, 1);
    document.querySelector("html")?.style.setProperty("--primary1", colorID);
}
OpacityValuePrimary();

//   LOCAL STORAGE BACK-UP

export function localStorageBackUp2() {
    let html = document.querySelector("html")?.style;
    let body = document.querySelector("body");
    (localStorage.sashrtl) && LtrtoRtl ();
    (localStorage.sashltr) && RtltoLtr ();
    if (localStorage.getItem("sashdarktheme")) {
        dark();
    }
    if (localStorage.getItem("sashtransperenttheme")) {
        Transparent();
    }
    if (localStorage.getItem("sashprimaryColor") !== null) {
        body?.classList.add("light-mode");

        // let ltr = document.getElementById("myonoffswitch6") as HTMLInputElement
        // ltr.checked = true;

        body?.classList.remove("dark-mode");
        body?.classList.remove("transparent-mode");
        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashprimaryColor")
        );
        html?.setProperty(
            "--primary-bg-hover",
            localStorage.getItem("sashprimaryHoverColor")
        );
        html?.setProperty(
            "--primary-bg-border",
            localStorage.getItem("sashprimaryBorderColor")
        );
    }
    if (localStorage.getItem("sashdarkPrimaryColor") !== null) {
        body?.classList.add("dark-mode");

        let ltr = document.getElementById("myonoffswitch2") as HTMLInputElement
        ltr.checked = true;

        body?.classList.remove("light-mode");
        body?.classList.remove("transparent-mode");

        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashdarkPrimaryColor")
        );
        html?.setProperty(
            "--primary-bg-hover",
            localStorage.getItem("sashdarkPrimaryColor")
        );
        html?.setProperty(
            "--primary-bg-border",
            localStorage.getItem("sashdarkPrimaryColor")
        );
    }
    if (localStorage.getItem("sashtransparentPrimaryColor") !== null) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        html?.setProperty(
            "--primary-bg-color",
            localStorage.getItem("sashtransparentPrimaryColor")
        );
    }
    if (localStorage.getItem("sashtransparentBgColor") !== null) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        html?.setProperty(
            "--transparent-body",
            localStorage.getItem("sashtransparentBgColor")
        );
    }
    if (
        localStorage.getItem("sashtransparent-bgImgPrimaryColor") !== null ||
        localStorage.getItem("sashBgImage") !== null
    ) {
        body?.classList.add("transparent-mode");
        document.getElementById("myonoffswitchTransparent");

        body?.classList.remove("light-mode");
        body?.classList.remove("dark-mode");
        let img: any = localStorage.getItem("sashBgImage");
        html?.setProperty("--primary-bg-color",
            localStorage.getItem("sashtransparent-bgImgPrimaryColor"));
        body?.classList.add(img);
    }

    if (localStorage.sashrtl) {
        document.querySelector(".app")?.classList.add("rtl");
        document.querySelector("html[lang=en]")?.setAttribute("dir", "rtl");
        document.querySelector(".app")?.classList.remove("ltr");
        let mySwitch = document.querySelector("#myonoffswitch23") as HTMLInputElement
        mySwitch.checked = false;
        let myonoffswitch = document.querySelector("#myonoffswitch24") as HTMLInputElement
        myonoffswitch.checked = true;
    }

    if (localStorage.sashhorizontal) {
        document.querySelector("body")?.classList.add("horizontal");
        document.querySelector(".main-container")?.classList.add("container");
        document.querySelector(".main-sidemenu")?.classList.add("container");
        document.querySelector(".main-content")?.classList.add("hor-content");
        document.querySelector(".app-sidebar")?.classList.add("horizontal-main");
        document.querySelector(".header")?.classList.add("hor-header");
        document.querySelector(".side-app")?.classList.add("container");
        document.querySelector(".app")?.classList.remove("sidebar-mini");
        document.querySelector(".header")?.classList.remove("app-header");
        document.querySelector(".main-content")?.classList.remove("app-content");
        document.querySelector(".main-container")?.classList.remove("container-fluid");
        document.querySelector(".app")?.classList.remove("sidenav-toggled");
        document.querySelector(".app")?.classList.remove("horizontal-hover");
        document.querySelector(".horizontal .side-menu")?.classList.add("flex-nowrap");


        let mySwitch = document.querySelector("#myonoffswitch34") as HTMLInputElement
        mySwitch.checked = false;
        let myonoffswitch = document.querySelector("#myonoffswitch35") as HTMLInputElement
        myonoffswitch.checked = true;
        checkHoriMenu();
    }

    if (localStorage.sashhorizontalHover) {
        document.querySelector("body")?.classList.add("horizontal-hover");
        document.querySelector(".app")?.classList.add("horizontal-hover");
        document.querySelector(".app")?.classList.add("horizontal");
        document.querySelector(".main-content")?.classList.add("hor-content");
        document.querySelector(".main-container")?.classList.add("container");
        document.querySelector(".header")?.classList.add("hor-header");
        document.querySelector(".app-sidebar")?.classList.add("horizontal-main");
        document.querySelector(".main-sidemenu")?.classList.add("container");
        document.querySelector(".side-app")?.classList.add("container");

        document.querySelector("#slide-left")?.classList.remove("d-none");
        document.querySelector("#slide-right")?.classList.remove("d-none");
        document.querySelector(".main-content")?.classList.remove("app-content");
        document
            .querySelector(".main-container")
            ?.classList.remove("container-fluid");
        let myonoffswitch = document.querySelector("#myonoffswitch1") as HTMLInputElement
        myonoffswitch.checked = false;
        let myonoffswitcher = document.querySelector("#myonoffswitch2") as HTMLInputElement
        myonoffswitcher.checked = false;
        let HorizontalHover = document.querySelector("#myonoffswitch111") as HTMLInputElement
        HorizontalHover.checked = true;
        document.querySelector(".header")?.classList.remove("app-header");
        document.querySelector(".app")?.classList.remove("sidebar-mini");
        document.querySelector(".app")?.classList.remove("sidenav-toggled");

        document.querySelector(".horizontal .side-menu")?.classList.add("nowrap");

        let li = document.querySelectorAll(".side-menu li");
        li.forEach((e: any) => {
            if (e?.classList.contains("is-expaned")) {
                let ele = [...e.children];
                ele.forEach((el) => {
                    el?.classList.remove("active");
                    if (el?.classList.contains("slide-menu")) {
                        el.style = "";
                        el.style.display = "none";
                    }
                });
                e?.classList.remove("is-expaned");
            }
        });
        checkHoriMenu();

    }

    if (localStorage.getItem("sashlighttheme") !== null) {
        LightTheme();
    }
}








