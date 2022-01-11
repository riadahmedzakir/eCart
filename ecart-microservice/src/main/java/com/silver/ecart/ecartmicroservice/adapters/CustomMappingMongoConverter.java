// package com.silver.ecart.ecartmicroservice.adapters;

// import org.bson.types.ObjectId;
// import org.springframework.data.mapping.context.MappingContext;
// import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
// import org.springframework.data.mongodb.core.convert.NoOpDbRefResolver;
// import org.springframework.data.mongodb.core.mapping.MongoPersistentEntity;
// import org.springframework.data.mongodb.core.mapping.MongoPersistentProperty;
// import org.springframework.stereotype.Component;
// import org.springframework.util.ClassUtils;

// @Component
// public class CustomMappingMongoConverter extends MappingMongoConverter {

//     public CustomMappingMongoConverter(
//             MappingContext<? extends MongoPersistentEntity<?>, MongoPersistentProperty> mappingContext) {

//         super(NoOpDbRefResolver.INSTANCE, mappingContext);
//     }

//     @Override
//     public Object convertId(Object id, Class<?> targetType) {
//         if (id == null) {
//             return null;
//         } else if (ClassUtils.isAssignable(ObjectId.class, targetType) && id instanceof String
//                 && ObjectId.isValid(id.toString())) {
//             return id;
//         }
//         return super.convertId(id, targetType);
//     }

// }
