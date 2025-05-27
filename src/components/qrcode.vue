<template>
    <canvas

            :id="props.qrcodeId" :width="props.qrcodeSize*2" :height="props.qrcodeSize*2"
            :style="{width:props.qrcodeSize+'px',height:props.qrcodeSize+'px'}"
            class="v-middle"
            ref="canvasRef"
            ></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import UQRCode from "uqrcodejs";
import { getDownloadUrl } from '@/api/home'
const props = defineProps({
    qrcodeSize:100,

    qrcodeId:{
      type:String,
      default:'qrcode'}
})
const canvasRef = ref(null);
const qr =new UQRCode()
const qrcodeSrc = ref('')
const getDownload = async () => {
    const response = await getDownloadUrl()
    qrcodeSrc.value = response.data.apkUrl
 
    qrDraw()
}

onMounted(() => {
  getDownload()

  
});
function qrDraw(){
  qr.data =qrcodeSrc.value;
  qr.size =props.qrcodeSize*2;
  qr.bg = '#ffffff';
  qr.fg = '#000000';
  qr.make();
  const canvas = canvasRef.value;
  if (canvas) {
    const canvasContext = canvas.getContext('2d');
    qr.canvasContext = canvasContext;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    qr.drawCanvas();
  }
  // var canvas = document.getElementById(props.qrcodeId);
  // 获取canvas上下文
  // var canvasContext = canvas.getContext("2d");

  
  // 设置uQRCode实例的canvas上下文
  // qr.canvasContext = canvasContext;
  // 调用绘制方法将二维码图案绘制到canvas上
  // qr.drawCanvas();
}
defineExpose({
  qrDraw
});
watch(() => props.qrcodeSrc, () => {
  qrDraw();
});
</script>

<style>

</style>