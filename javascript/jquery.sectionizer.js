jQuery(document).ready(
    function(){
        //must be first ...
        Sectionizer.init();
    }
);


var Sectionizer = {

    debug: false,

    contentSectionSelector: "#contents",

    openedHeadingClass: "openedHeading",

    closedHeadingClass: "closedHeading",

    openedElementClass: "openedElement",


    closedElementClass: "closedElement",

    init: function(){
        //other stuff
        Sectionizer.coreInits();
        Sectionizer.checkCookies();
    },

    coreInits: function(){

        jQuery(Sectionizer.contentSectionSelector + " h3").each(
            function(i, el) {
                jQuery(el)
                    .attr('id', "SectionizerHeading"+i)
                    .toggleClass(Sectionizer.closedHeadingClass)
                    .nextUntil('h3')
                    .toggleClass(Sectionizer.closedElementClass)

            }

        );
        //add click functionality on H3...
        jQuery(Sectionizer.contentSectionSelector + " h3")
            .not("doNotSlide")
            .attr("tabIndex", 0)
            .on(
                'click',
                function() {
                    jQuery('h3.'+Sectionizer.openedHeadingClass).not(this).click();
                    //jQuery('#contents').css('visibility', 'hidden');
                    if(!jQuery(this).hasClass('doNotSlide')){

                        jQuery(this)
                            .toggleClass(Sectionizer.closedHeadingClass)
                            .toggleClass(Sectionizer.openedHeadingClass);
                        if(jQuery(this).hasClass(Sectionizer.closedHeadingClass)) {
                            jQuery(this)
                                .nextUntil( "h3" )
                                .removeClass(Sectionizer.openedElementClass)
                                .addClass(Sectionizer.closedElementClass);
                        }
                        else {
                            jQuery(this)
                                .nextUntil( "h3" )
                                .removeClass(Sectionizer.closedElementClass)
                                .addClass(Sectionizer.openedElementClass);
                                document.cookie = "current_section_heading_" + Sectionizer.uniquePageID() + "=" + jQuery(this).attr('id');

                        }
                        var el = this;
                        if(jQuery(el).hasClass(Sectionizer.openedHeadingClass)) {
                          window.setTimeout(
                              function(){
                                  jQuery('html, body').animate(
                                    {
                                      scrollTop: jQuery(el).offset().top,
                                    },
                                    {
                                      duration: 500,
                                      complete: function() {jQuery('#contents').fadeIn(); }
                                    }
                                  );
                              },
                              100
                          );
                        }
                    }
                }
            )




    },

    checkCookies: function(){
        var cookie = "current_section_heading_" + this.uniquePageID();
        var id = Sectionizer.getCookie(cookie);
        if(id) {
            jQuery(Sectionizer.contentSectionSelector+' h3.'+Sectionizer.openedHeadingClass).click();
            if(jQuery("h3#" + id).length > 0) {
                jQuery("h3#" + id).click();
            }
        }
    },


    getCookie: function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return "";
    },

    openMySection: function(){
        if(jQuery(this).is(":visible")) {
            //do nothing;
            console.debug("visible");
        }
        else {
            console.debug("not visible");
            var previousH3 = jQuery(this).prev("h3:first");
            if(jQuery(previousH3).hasClass(Sectionizer.closedHeadingClass)) {
                jQuery(previousH3).click();
            }
        }
    },

    uniquePageID: function() {
        return "SECTIONIZER_UNIQUE";
    }


}
