<template>
  <div class="user">
    <h1>用户中心</h1>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>
      <div class="user-info">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="用户名">Admin</el-descriptions-item>
          <el-descriptions-item label="角色">管理员</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.user {
  padding: 20px;
  .box-card {
    max-width: 800px;
    margin: 20px auto;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style> 