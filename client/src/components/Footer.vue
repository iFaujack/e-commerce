<template>
  <div class="base-layer">
      <b-container>
            <b-row>
                <b-col cols="12" sm="6" lg="6" class="mt-5 mb-5"> 
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.022861907926!2d106.77942751476932!3d-6.26071869546838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1a8713ce207%3A0x2c3ea1f4a28bfac5!2sHacktiv8!5e0!3m2!1sid!2sid!4v1566339262961!5m2!1sid!2sid" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>
                </b-col>
                <b-col cols="12" sm="12" lg="6" class="mt-5 mb-5"> 
                    <div class="footer-sign">
                        <h3> Hand Of Midas </h3>
                        <p> Jalan Sultan Iskandar Muda No.7</p>
                        <p> Kebayoran Lama , Jakarta Selatan</p>
                        <p> DKI Jakarta </p>
                        <b-button variant="outline-success">Leave a Message</b-button>
                    </div>
                </b-col>
            </b-row>
      </b-container>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.base-layer{
   background:#16284C;
   color: white;
   padding: 30px 0;
   width: 100%;
}
.footer-sign {
    display: flex;
    flex-direction: column;
    text-align: left;
}
</style>
